export default (params) => {
    uni.showLoading({
        title: "Loading",
        mask: true
    })

    if (params.method == "POST") {
        params.header = {
            "content-type": "application/x-www-form-urlencoded"
        }
    }

    params.timeout = 6000

    return new Promise((resolve, reject) => {
        uni.request({
            ...params,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                uni.hideLoading()
            }
        })
    })
}