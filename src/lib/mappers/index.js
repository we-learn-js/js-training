 

const camelCaseToDash = ( str ) => {
    return str.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
}

const urlFromMarkdown = (md) => `/chapters/${camelCaseToDash(md.name)}`

module.exports = {urlFromMarkdown}