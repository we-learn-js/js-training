(function(win, Reveal) {
  const NS = 'js-training'
  const NS_CLIENT = `${NS}-client`
  const CLASS = 'jsTraining-questionSlide'
  const CLASS_STATUS = CLASS + '-status'
  const CLASS_CLIENT = CLASS + '-client'
  const CLASS_BUTTON = CLASS + '-button'

  const container = document.createElement('DIV')
  container.className = CLASS_STATUS
  document.body.appendChild(container)
  const isMaster = win.location.href.indexOf('?master') !== -1
  const isQuestionSlide = (el) => el.classList.contains(CLASS)


  const clientId = new Promise(function(resolve) {
    const clientId = localStorage.getItem(NS_CLIENT)
    if(clientId) {
      resolve(clientId)
    } else {
      new Fingerprint2().get(id => {
        localStorage.setItem(NS_CLIENT, id)
        resolve(id)
      })
    }

  })

  const socket = new Promise(function(resolve) {
    Reveal.addEventListener('ready', function(event) {
      var socket = io.connect(Reveal.getConfig().multiplex.url);
      resolve(socket)
    })
  })

  const multiplex = new Promise(function(resolve) {
    Reveal.addEventListener('ready', function(event) {
      resolve(Reveal.getConfig().multiplex)
    })
  })

  const getSlideTagFromState = ({indexv, indexh}) => `${indexv}/${indexh}`

  const getStoreStatus = () => {
    let data = localStorage.getItem(NS)
    return data && JSON.parse(data) || {}
  }

  const resetStoredStatus = () => localStorage.removeItem(NS)

  const debounce = (func, wait, immediate) => {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

  const updateClientState = (clientId, slide, status) => {
    let data = getStoreStatus()
    data[clientId] = data[clientId] || {}
    Object.assign(data[clientId], {slide, status})
    localStorage.setItem(NS, JSON.stringify(data))
  }

  const getCurrentClients = (slide) => {
    const data = getStoreStatus()
    console.log(data)
    return Object.keys(data)
      .map((key) => data[key].slide === slide ? data[key] : false)
      .filter(Boolean)
  }

  const updateStatusBar = debounce( (slide) => {
      container.innerHTML = ''
      isQuestionSlide(Reveal.getCurrentSlide()) && getCurrentClients(slide)
        .forEach(({status}) => {
          const el = document.createElement('DIV')
          el.className = CLASS_CLIENT + (status ? ` ${CLASS_CLIENT}--active` : '')
          container.appendChild(el)
        })
    }, 2000
  )

  const sentClientMessage = (state, status=false) => Promise.all([socket, clientId, multiplex])
    .then(function([socket, clientId, { secret, id: socketId }]) {
      var messageData = {
        secret, socketId, clientId, status,
        slide: getSlideTagFromState(state)
      }
      console.log('MESSAGE SENT', messageData)
      socket.emit('multiplex-statechanged', messageData);
    })


  const initMaster = () => {
    //resetStoredStatus()
    Promise.all([socket, multiplex])
      .then(function([socket, multiplex]) {
        socket.on(multiplex.id, function({socketId, clientId, slide, status}) {
          if (socketId !== multiplex.id || !clientId) { return; }
          updateClientState(clientId, slide, status)
          updateStatusBar(slide)
          console.log('MESSAGE RECEIVED', clientId, slide)
        });
      })
  }

  const initClient = () => {
    const button = document.createElement('button')
    Reveal.addEventListener('slidechanged', function(event) {
      console.log('slidechanged', event)
      if(isQuestionSlide(Reveal.getCurrentSlide())) {
        button.innerHTML = 'Done'
        button.style.display = 'block'
      } else {
        button.style.display = 'none'
      }
      sentClientMessage(Reveal.getState())
    })

    button.className = CLASS_BUTTON
    button.addEventListener('click', evt => {
      button.style.display = 'none'
      sentClientMessage(Reveal.getState(), true)
    })
    container.appendChild(button)

    window.addEventListener('unload', function(event) {
      sentClientMessage({}, false)
    });
  }

  isMaster ? initMaster() : initClient()



})(window, Reveal)
