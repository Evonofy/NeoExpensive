interface Navigator {
  userAgentData: {
    brands: string[];
    mobile: boolean;
    // https://wicg.github.io/ua-client-hints/#sec-ch-ua-platform
    platform: 'Android' | 'Chrome OS' | 'iOS' | 'Linux' | 'macOS' | 'Windows' | 'Unknown';
  };
}
