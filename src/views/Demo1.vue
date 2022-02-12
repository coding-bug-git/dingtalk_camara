<template>
  <div class="">
    demo1
    <form action="http:// xxx.com/register" id="registerForm" method="post">
      请输入用户名：<input type="text" name="userName"/>
      请输入密码：<input type="text" name="password"/>

      请输入手机号码：<input type="text" name="phoneNumber"/>
      <button>提交</button>
    </form>
  </div>
</template>

<script>

import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'Demo1',
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
      /** *********************策略对象**************************/
      var strategies = {
        isNonEmpty: function (value, errorMsg) {
          if (value === '') {
            return errorMsg
          }
        },
        minLength: function (value, length, errorMsg) {
          if (value.length < length) {
            return errorMsg
          }
        },
        isMobile: function (value, errorMsg) {
          if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg
          }
        }
      }
      /** *********************Validator 类**************************/
      var Validator = function () {
        this.cache = []
      }
      Validator.prototype.add = function (dom, rules) {
        var self = this
        for (var i = 0, rule; rule = rules[i++];) {
          (function (rule) {
            var strategyAry = rule.strategy.split(':')
            var errorMsg = rule.errorMsg
            self.cache.push(function () {
              var strategy = strategyAry.shift()
              strategyAry.unshift(dom.value)
              strategyAry.push(errorMsg)
              return strategies[strategy].apply(dom, strategyAry)
            })
          })(rule)
        }
      }
      Validator.prototype.start = function () {
        for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
          var errorMsg = validatorFunc()
          if (errorMsg) {
            return errorMsg
          }
        }
      }

      /** *********************客户调用代码**************************/
      var registerForm = document.getElementById('registerForm')
      console.log(registerForm.userName)
      var validataFunc = function () {
        var validator = new Validator()

        validator.add(registerForm.userName, [{
          strategy: 'isNonEmpty',
          errorMsg: '用户名不能为空'
        }, {
          strategy: 'minLength:6',
          errorMsg: '用户名长度不能小于6 位'
        }])

        validator.add(registerForm.password, [{
          strategy: 'minLength:6',
          errorMsg: '密码长度不能小于6 位'
        }])

        var errorMsg = validator.start()
        return errorMsg
      }
      registerForm.onsubmit = function () {
        var errorMsg = validataFunc()
        if (errorMsg) {
          alert(errorMsg)
          return false
        }
      }
    })

    return toRefs(state)
  }
}
</script>
