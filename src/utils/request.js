
export default (params) => {

    if (params.method == "POST") {
        params.header = { "content-type": "application/x-www-form-urlencoded" }
    }

    uni.showLoading({
        title: "Loading"
    })

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