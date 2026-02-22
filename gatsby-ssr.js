// Atlaskit/navigation-next accesses localStorage and other browser APIs at
// module initialization time, which breaks SSR. Use simple passthroughs here
// and let gatsby-browser.js hydrate the full navigation shell on the client.
exports.wrapPageElement = ({element}) => element
exports.wrapRootElement = ({element}) => element
