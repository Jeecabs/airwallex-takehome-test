import { rest } from "msw";

export const handlers = [
  rest.post(
    "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
    async (req, res, ctx) => {
      const { name, email } = (await req.json()) as {
        name: string;
        email: string;
      };

      if (name && email) {
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
            message: "You have successfully requested an invitation.",
          })
        );
      }

      return res(
        ctx.status(400),
        ctx.json({
          success: false,
          errorMessage: "An error occurred. Please try again later.",
        })
      );
    }
  ),
];
