<template>
  <div class="content home">
    <img src="@/assets/images/earth.png" alt="" class="title-img" />
    <h1 class="title">세계 국기 퀴즈</h1>
    <div class="select-length">
      <p>
        아래 문제 개수를 선택한 후<br />
        <span class="btn-start sm">QUIZ START!</span>버튼을 눌러주세요.
      </p>
      <el-button
        type="primary"
        v-for="(item, index) in quizLengthItems"
        :key="index"
        v-text="item"
        @click="onSelectQuizLength(item, index)"
        :class="{ 'is-active': index === activeItem }"
        plain
      ></el-button>
    </div>
    <el-button type="primary" class="btn-start" @click="goQuiz()"
      >QUIZ START!</el-button
    >
  </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  name: "Home",
  components: {},
  data() {
    return {
      quizLengthItems: [],
      activeItem: null,
      selectedLength: null,
    }
  },
  created() {
    this.setQuizLengthItems()
  },
  methods: {
    ...mapMutations(["SET_QUIZ_LENGTH", "RESET_RESULT"]),

    // 퀴즈 개수 선택 배열
    setQuizLengthItems() {
      for (let i = 10; i <= 110; i += 20) {
        this.quizLengthItems.push(i)
      }
    },

    // 퀴즈 개수 선택 이벤트
    onSelectQuizLength(length, index) {
      // 같은 버튼 클릭 시 함수 실행 중지

      if (this.activeItem == index) return

      // 클릭한 대상의 index를 activeItem 변수에 할당
      this.activeItem = index

      // 클릭한 대상의 length를 selectedLength 변수에 할당
      this.selectedLength = length

      // 클릭한 대상의 length를 store의 quizLength 변수에 저장
      this.$store.commit("SET_QUIZ_LENGTH", length)
    },

    // 퀴즈 페이지로 이동
    goQuiz() {
      // 선택한 퀴즈 개수 없을 경우 return
      if (!this.selectedLength) {
        alert("문제 개수를 선택하세요!")
        return
      }

      // 이전 결과 리셋
      this.RESET_RESULT()

      // 라우터 이동
      this.$router.push("/quiz")
    },
  },
}
</script>

<style lang="scss" scoped>
@keyframes floating {
  100% {
    transform: translateY(-15px);
  }
  50% {
    transform: translateY(-5px);
  }
  0% {
    transform: translateY(-15px);
  }
}

.home {
  justify-content: center;

  .title-img {
    width: rem(70);
    animation: floating 2s infinite;
  }

  .title {
    font-size: rem(50);
    text-align: center;
  }
}

.select-length {
  @include flexbox();
  flex-wrap: wrap;
  width: 75%;
  margin: rem(10) 0;

  p {
    width: 100%;
    margin-bottom: rem(10);
    font-size: rem(20);
    line-height: 1.3;
    text-align: center;
  }

  button {
    width: 32.33333%;
    padding: rem(15);
    margin: 0.5%;
    font-size: rem(20);

    &.is-active {
      background: $primary;
      color: $primaryFont;
    }
  }
}

.btn-start {
  @include flexbox($jc: center);
  margin: rem(20) 0 0;
  padding: rem(20);
  font-size: rem(40);
  color: $primaryFont;
  background: $primary;
  border-radius: rem(10);
  transition: 0.3s;

  &:hover {
    background: lighten($primary, 10%);
    color: lighten($primaryFont, 10%);
  }

  &.sm {
    display: inline-block;
    margin: 0 rem(3) 0 0;
    padding: rem(5) rem(8);
    font-size: rem(12);
    border-radius: rem(4);
    line-height: 1;
  }
}
</style>
