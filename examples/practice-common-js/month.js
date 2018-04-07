console.log('month')

const NAMES = ["January", "February", "March", "April",
               "May", "June", "July", "August", "September",
               "October", "November", "December"]
function getName (number) { return NAMES[number] }
function getNumber (name) { return NAMES.indexOf(name) }

module.exports = {
  name: getName,
  number: getNumber
}
