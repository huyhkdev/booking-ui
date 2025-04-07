export const httpErrorToToastAtr = (error: any): [string, string] => {
    try {
      const message = error?.response?.data?.errors?.[0]?.errorMessage;
      const code = error?.response?.data?.errors?.[0]?.errorCode;
  
      if (message && code) {
        return [message, code];
      }
  
      return ["Lỗi không xác định", "UNKNOWN_ERROR"];
    } catch (err) {
      return ["Lỗi không xác định", "UNKNOWN_ERROR"];
    }
  }
  