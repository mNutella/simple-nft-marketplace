import { HttpMethod } from "@common/utils/constants";

export default async function post(req, res) {
  const { method } = req;
  const body = JSON.parse(req.body);

  switch (req.method) {
    // case HttpMethod.GET:
    //   return getPost(req, res, session);
    //   break;
    // case HttpMethod.POST:
    //   return createPost(req, res);
    //   break;
    // case HttpMethod.DELETE:
    //   return deletePost(req, res);
    //   break;
    // case HttpMethod.PUT:
    //   return updatePost(req, res);
    //   break;
    default:
      res.setHeader("Allow", [
        HttpMethod.GET,
        HttpMethod.POST,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
