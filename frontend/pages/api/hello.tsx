import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  console.log(req.headers);

  // if (req.method === 'POST')

  // req.cookies

  // req.query

  // req.body

  res.status(200).json({ name: 'John Doe' });
};

// res.send('string, object or buffer')

// res.redirect([status,] path)
