
module.exports = {
    imageCache(ApiUrl, image_url, image_name, call_back) {

        uni.getStorage({
            key: image_name,
            success(res) {
                call_back(res)
                // console.log('res',res);
            },
            fail(err) {
                // console.log('err',err);
                uni.downloadFile({
                    url: ApiUrl + image_url,
                    success(res) {
                        call_back(res)
                        // console.log('res2',res);
                        uni.setStorage({
                            key: image_name,
                            data: res,
                            success: function () {

                            }
                        })
                    }
                })
            }
        })
    },
    textCache() {

    },
}