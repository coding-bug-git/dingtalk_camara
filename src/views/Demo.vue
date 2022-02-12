<template>
  <div class="">
    demo
    <form action="http:// xxx.com/register" id="registerForm" method="post">
      请输入用户名：<input type="text" name="userName" />
      请输入密码：<input type="text" name="password" />

      请输入手机号码：<input type="text" name="phoneNumber" />
      <button>提交</button>
    </form>
  </div>
</template>

<script>

import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'Demo',
  setup () {
    const state = reactive({
      a: 1,
      m () {
        // console.log(this.a)
        if (this.a >= 0 && this.a < 10) {
          console.log(1)
        }
        if (this.a >= 10 && this.a < 20) {
          console.log(10)
        }
        if (this.a >= 20 && this.a < 30) {
          console.log(20)
        }
        if (this.a >= 30 && this.a < 40) {
          console.log(20)
        }
      }
    })

    onMounted(() => {
      const registerForm = document.getElementById('registerForm')
      registerForm.onsubmit = function () {
        if (registerForm.userName.value === '') {
          alert('用户名不能为空')
          return false
        }
        if (registerForm.password.value.length < 6) {
          alert('密码长度不能少于6 位')
          return false
        }
        if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)) {
          alert('手机号码格式不正确')
          return false
        }
      }
    })

    return toRefs(state)
  }
}
</script>
