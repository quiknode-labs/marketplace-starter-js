import axios from "axios"; // Import the Axios library

class RPCRequestTranslator {
  constructor() {
    this.API_BASE_URL = "http://example.com/";
    this.METHOD_PATHS = { qn_test: "" };
  }

  async translateRequest(rpcMethod, rpcParams) {
    console.log("  matched method to: " + this.METHOD_PATHS[rpcMethod]);
    const translatedRequest = {
      method: "get",
      url: `${this.API_BASE_URL}${this.METHOD_PATHS[rpcMethod]}`,
      body: rpcParams,
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": "some-value",
      },
    };

    try {
      // Use the Axios library to perform the translated request
      const response = await axios(translatedRequest);
      return response.data;
    } catch (error) {
      throw new Error(`Error performing request: ${error.message}`);
    }
  }
}

export default RPCRequestTranslator;
