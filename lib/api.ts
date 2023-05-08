interface RequestInviteParams {
  name: string;
  email: string;
}

export const requestInvite = async ({ name, email }: RequestInviteParams) => {
  try {
    const response = await fetch(
      "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }
    );

    if (response.ok) {
      return {
        success: true,
        message: "You have successfully requested an invitation.",
      };
    } else {
      const errorMessage = await response?.json();
      return {
        success: false,
        message:
          errorMessage?.errorMessage ||
          "An error occurred. Please try again later.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};
