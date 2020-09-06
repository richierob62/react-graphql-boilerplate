import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  console.log(req.headers);

  res.status(200).json({ name: 'John Doe' });
};
