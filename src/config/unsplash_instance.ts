import { createApi } from 'unsplash-js';

export const hiep1Key = 'h453zpCjIwVYzB_qNmt8uwgSdEO4iAc2kI2dfFAVcMQ';
export const hiep2Key = '60erYwsNfZb0PVr8oUZS3Ho31p2WhoUYfpvtwQX6pQY';
const instanceServer = createApi({
   accessKey: hiep1Key
});

export { instanceServer };
