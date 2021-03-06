import Server from './server';

class API extends Server{
  /**
   *  用途：上传图片
   *  @url https://elm.cangdu.org/v1/addimg/shop
   *  返回status为1表示成功
   *  @method post
   *  @return {promise}
   */
  async uploadImg(params = {}){
    try{
      let result = await this.axios('post', '//elm.cangdu.org/v1/addimg/shop', params); 
      if(result && result.status === 1){
        return result;
      }else{
        let err = {
          tip: '上传图片失败',
          response: result,
          data: params,
          url: '//elm.cangdu.org/v1/addimg/shop',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

// post请求
	async postAxios(url, params = {}) {
		try {
			let result = await this.axios('post', url, {data: params})
			if(result) {
				if(result.code === '0') {
					return result
				} else {
					throw result
				}
			} else {
				let err = {
          desc: '获取数据失败',
        }
				throw err
			}
		} catch(err) {
			throw(err)
		}
	}	
}

export default new API();