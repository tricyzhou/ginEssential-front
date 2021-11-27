<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="注册">
          <b-form>
            <b-form-group label="姓名">
              <b-form-input
                v-model="$v.user.name.$model"
                type="text"
                placeholder="输入名称"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="手机号">
              <b-form-input
                v-model="$v.user.telephone.$model"
                type="number"
                placeholder="输入手机号"
                required
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('telephone')">
                手机号不符合要求
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="密码">
              <b-form-input
                v-model="$v.user.password.$model"
                type="password"
                placeholder="输入密码"
                required
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须大于等于为6位
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <b-button
                @click="register"
                variant="outline-primary"
                block
              >注册</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import customValidator from '@/helper/validator';

// import storageService from '@/service/storageService';
// import userService from '@/service/userService';

export default {
  data() {
    return {
      user: {
        name: '',
        telephone: '',
        password: '',
      },
      validation: null,
    };
  },
  validations: {
    user: {
      name: {},
      telephone: {
        required,
        // minLength: minLength(11),
        // maxLength: maxLength(11),
        telephone: customValidator.telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },

  },
  methods: {
    ...mapActions('userModule', { userRegister: 'register' }),
    validateState(name) {
      // 这里是es6的解构赋值
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    register() {
      // if (this.user.telephone.length !== 11) {
      //   this.validation = false;
      //   return;
      // }
      // this.validation = true;
      // 验证数据
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      // 请求api
      this.userRegister(this.user).then(() => {
        // 跳转主页
        this.$router.replace({ name: 'Home' });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '数据验证错误',
          variant: 'danger',
          solid: true,
        });
      });
      // userService.register(this.user).then((res) => {
      //   // 保存token
      //   this.SET_TOKEN(res.data.data.token);
      //   // storageService.set(storageService.USER_TOKEN, res.data.data.token);
      //   return userService.info();
      // }).then((res) => {
      //   // 保存用户信息
      //   this.SET_USERINFO(res.data.data.user);
      //   // storageService.set(storageService.USER_INFO, JSON.stringify(response.data.data.user));
      //   // 跳转主页
      //   this.$router.replace({ name: 'Home' });
      // }).catch((err) => {
      //   this.$bvToast.toast(err.response.msg, {
      //     title: '数据验证错误',
      //     variant: 'danger',
      //     solid: true,
      //   });
      // });
      // console.log('register');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
