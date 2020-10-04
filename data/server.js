/**
 * Customize the json-server response to match the Django REST Framework pagination style.
 *
 * @author Jesús Moreno Amor <jesus@morenoamor.com>.
 * @version 1.0.0
 */

const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router('data/data.json')
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults()
var db = router.db

function parseLinksHeader(header) {
  if (header && header.length) {
    return header.split(',').reduce((obj, item) => {
      let key = item.split(';')[1].replace(/rel="(.*)"/, '$1').trim();
      let value = item.split(';')[0].replace(/<(.*)>/, '$1').trim();
      obj[key] = value;
      return obj
    }, {});
  }
  return {};
}

router.render = (request, response) => {
  let paginationHeader = response.getHeaders().link;
  let paginationLinks = parseLinksHeader(paginationHeader);

  if (request.header("X-JSON-Server-List")) {
    response.jsonp({
      "count": response.getHeaders()["x-total-count"],
      "next": paginationLinks.next,
      "previous": paginationLinks.prev,
      "results": response.locals.data
    });
  } else {
    response.jsonp(response.locals.data);
  }
}

server.use(middlewares)
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
