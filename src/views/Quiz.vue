<template>
  <div class="content quiz">
    <!-- 문제 넘버 -->
    <h1 class="title">
      QUIZ <span class="num" v-text="quizCnt"></span> /
      <span class="total" v-text="quizLength"></span>
    </h1>

    <!-- 이미지 박스 -->
    <div
      class="img-box"
      @click="onClickImgBox()"
      :class="[isActive ? 'is-active' : '']"
    >
      <!-- 국기 이미지 -->
      <div class="front">
        <img :src="flagImage" :alt="rightAnswer + ' 국기'" />
      </div>

      <!-- 힌트 -->
      <div class="back">
        <p class="hint">
          글자 수 : <strong v-text="rightAnswer.length"></strong> <br />
          첫 글자 : <strong v-text="rightAnswer.charAt(0)"></strong>
        </p>
      </div>
    </div>

    <!-- 정답 입력칸 -->
    <el-input
      placeholder="정답 입력 후 enter"
      v-model="input"
      clearable
      ref="input"
      @keypress.native.enter="checkAnswer()"
    ></el-input>

    <div class="bottom-group">
      <div class="hint-tip">
        <p class="is-web">힌트 : 이미지 마우스 오버</p>
        <p class="is-mob">힌트 : 이미지 클릭</p>
      </div>

      <!-- 패스 / 홈으로 -->
      <div class="btn-group">
        <!-- 패스 -->
        <el-tooltip placement="top-end" effect="light">
          <el-button class="btn-next" type="danger" plain @click="goNext()">
            <span class="material-icons-round icon"> skip_next </span>
            <span class="text">NEXT</span>
          </el-button>
          <div slot="content">
            문제가 어려울 때,<br />
            다음 문제로 넘어갈 수 있어요!
            <span class="color-point">(오답 처리)</span>
          </div>
        </el-tooltip>

        <!-- 홈 -->
        <el-tooltip placement="top-end" effect="light">
          <el-button class="btn-home" type="primary" plain @click="goHome()">
            <span class="material-icons-round icon"> home </span>
            <span class="text">HOME</span>
          </el-button>
          <div slot="content">
            홈으로 이동 시<br />
            문제가 초기화 되요!
          </div>
        </el-tooltip>
      </div>
    </div>

    <!-- 정답/오답 체크 -->
    <div
      class="check-answer"
      :class="{ 'is-wrong': !isRightAnswer }"
      v-if="isCheckAnswer"
    >
      <!-- 정답 -->
      <div class="check-answer__right" v-if="isRightAnswer">
        <div class="check-answer__icon">
          <span></span>
        </div>
        <p class="check-answer__text">정답입니다!</p>
      </div>

      <!-- 오답 -->
      <div class="check-answer__wrong" v-else>
        <div class="check-answer__icon">
          <span></span>
          <span></span>
        </div>
        <p class="check-answer__text">오답입니다!</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { mapState, mapMutations } from "vuex"

export default {
  data() {
    return {
      dataItmes: [],
      quizCnt: "0",
      flagImage: "",
      letterLength: "",
      firstLetter: "",
      input: "",
      rightAnswer: "",
      // 정답 체크
      isCheckAnswer: false,
      isRightAnswer: false,
      // 퀴즈 배열
      quizItmes: [],
      // 모바일용 힌트 보여주기
      isActive: false,
    }
  },
  computed: {
    ...mapState(["quizLength"]),
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapMutations(["SET_RIGHT_ANSWER_RESULT", "SET_WRONG_ANSWER_RESULT"]),

    // 초기화
    init() {
      // 랜덤 데이터 추출
      this.getRandomFlag()

      // 힌트 초기화
      this.isActive = false

      // 정/오답 부모 엘리먼트 초기화
      this.isCheckAnswer = false

      // input 초기화(포커스)
      this.input = ""
      this.$nextTick(() => this.$refs.input.focus())
    },

    // 데이터 페치
    fetchData() {
      // http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=인증키(URL Encode)&pageNo=1&numOfRows=10&cond[country_nm::EQ]=가나&cond[country_iso_alp2::EQ]=GH
      const myKey =
        "myEKkrNA12FMXdmrvXUyQkc2bxaUAaz4zaub1rcC5AEjteRvgHPPaQfk43RPpMxxr8aTbAXJO8mr%2Fa1ipxYwSA%3D%3D"
      const dataLength = 196

      axios
        .get(
          `//apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=${myKey}&pageNo=1&numOfRows=${dataLength}`
        )
        .then((response) => {
          // 국기 데이터
          const { data } = response.data
          // return data

          // 컴포넌트 내 변수에 데이터 할당
          this.dataItmes = data
          // console.log(this.dataItmes)

          // 처음에 데이터 가져온 후 초기화 함수 호출
          this.init()
        })
    },

    // 이미지 박스 클릭 토글(모바일용)
    onClickImgBox() {
      this.isActive = !this.isActive
    },

    // 랜덤 데이터 추출 (중복없이)
    getRandomFlag() {
      // 데이터(배열) 변수 할당
      const arr = this.dataItmes
      // 랜덤으로 국기 인덱스 뽑기
      const randomFlag = Math.floor(Math.random() * arr.length)

      // 랜덤 국기로 채워진 퀴즈 배열 길이가 총 문제 개수와 같을 때(전부 다 풀었을 때) 결과 페이지로 이동
      if (this.quizItmes.length == this.quizLength) {
        this.$router.push("/result").catch(() => {})
        return false
      }

      // 중복이 없으면
      if (this.quizItmes.indexOf(randomFlag) === -1) {
        // 퀴즈 배열에 랜덤 인덱스 추가
        this.quizItmes.push(randomFlag)
        // 퀴즈 번호 증가
        this.quizCnt++
        // 이미지 출력
        this.showFlagImage(arr, randomFlag)
      } else {
        // 중복이 있으면 재실행
        this.getRandomFlag()
      }
    },

    // 국기 이미지 랜덤 출력
    showFlagImage(arr, randomFlag) {
      this.flagImage = arr[randomFlag].download_url
      this.rightAnswer = arr[randomFlag].country_nm
    },

    // 정답/오답 체크
    checkAnswer() {
      // 정답 체크 중엔 해당 함수 실행 중지
      if (this.isCheckAnswer) return

      // 정/오답 부모 엘리먼트 보이기
      this.isCheckAnswer = true

      // 아무것도 입력하지 않았을 경우 패스로 간주
      if (this.input.trim() == "") {
        this.input = "패스"
      }

      if (this.input === this.rightAnswer) {
        // 정답이면 정답 표시 후 정답 결과 목록에 추가
        this.isRightAnswer = true
        this.filterAnswer("right")
      } else {
        // 오답이면 오답 표시 후 오답 결과 목록에 추가
        this.isRightAnswer = false
        this.filterAnswer("wrong")
      }

      setTimeout(() => {
        // 초기화
        this.init()
      }, 1500)
    },

    // 정답/오답 필터
    filterAnswer(answer) {
      // 결과 목록에 저장할 객체
      const payload = {
        type: answer, // 정/오답 구분
        quizCnt: this.quizCnt,
        flagImage: this.flagImage,
        myAnswer: this.input,
        rightAnswer: this.rightAnswer,
      }

      if (answer === "right") {
        this.$store.commit("SET_RIGHT_ANSWER_RESULT", payload)
      } else {
        this.$store.commit("SET_WRONG_ANSWER_RESULT", payload)
      }
    },

    // 패스
    goNext() {
      if (!confirm("패스하면 오답 처리 됩니다. 그래도 패스하시겠습니까?"))
        return
      // 패스할 시 결과화면 답변에 패스로 저장
      this.input = "패스"
      // 오답처리
      this.filterAnswer("wrong")
      // 초기화
      this.init()
    },

    // 홈으로
    goHome() {
      if (!confirm("문제가 초기화 됩니다. 그래도 이동하시겠습니까?")) return
      this.$router.push("/")
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-size: rem(35);

  .num {
    color: $primary;
    font-size: rem(45);
  }

  .total {
    color: #777;
  }
}

.img-box {
  position: relative;
  width: 100%;
  max-width: rem(300);
  height: 100%;
  max-height: rem(200);
  margin: rem(10) 0 rem(30);
  perspective: rem(800);

  .front,
  .back {
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: rem(10);
    transition: 0.8s;
    backface-visibility: hidden;
    position: absolute;
  }

  .front {
    transform: rotateY(0deg);
    border: 1px solid #ddd;
    background: #ddd;
  }

  .back {
    @include flexbox($jc: center);
    transform: rotateY(-180deg);
    background: $primary;
  }

  img {
    max-width: 100%;
    width: 100%;
    height: 100%;
    transform: scale(1.02);
  }

  .hint {
    color: $primaryFont;
    font-size: rem(26);
    line-height: 1.5;
    text-align: center;
  }
}

// 웹에서만 동작하는 hover 효과
@media (hover: hover) {
  .img-box:hover {
    .front {
      transform: rotateY(-180deg);
    }

    .back {
      transform: rotateY(0deg);
    }
  }
}

::v-deep .el-input {
  width: 80%;
  // width: rem(300);

  &__inner {
    height: rem(50);
    border-width: 2px;
    font-size: rem(20);
    color: $primary;
  }

  &__clear {
    margin-right: rem(5);
    font-size: rem(22) !important;
  }
}

::v-deep .el-button {
  > span {
    flex-direction: column;
  }

  border-radius: rem(10);
  padding: rem(3) rem(20);
}

.bottom-group {
  width: 100%;
  @include flexbox($ai: end, $jc: between);
  margin-top: auto;
}

.hint-tip {
  padding: rem(5) rem(15);
  border-radius: rem(30);
  background: $point;
  color: #fff;
}

.btn-group {
  margin-top: auto;
  align-self: end;

  .el-button {
    min-width: rem(87);
    height: rem(65);
  }

  .icon {
    margin-bottom: rem(3);
    font-size: rem(34);
  }

  .btn-home {
    .icon {
      font-size: rem(28);
    }
  }
}

.check-answer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  @include flexbox($jc: center);
  flex-direction: column;
  width: rem(400);
  padding: rem(30);
  background: #fff;
  border: rem(10) solid $primary;
  border-radius: rem(20);
  @include box-shadow-default();

  &.is-wrong {
    border-color: $point;
  }

  // variables
  $answerSize: rem(150);
  $answerSizeHalf: calc(#{$answerSize} / 2);
  $answerBorderSize: calc(#{$answerSize} / 10);

  &__icon {
    @include flexbox($jc: center);
    width: $answerSize;
    height: $answerSize;
    border-radius: 50%;
    background: #f8f8f8;
    border: $answerBorderSize solid;
  }

  &__text {
    margin-top: rem(10);
    font-size: rem(26);
    text-align: center;
  }

  &__right {
    .check-answer__icon {
      border-color: $primary;

      span {
        display: block;
        width: $answerSizeHalf;
        height: $answerSizeHalf;
        border-radius: 50%;
        border: $answerBorderSize solid $primary;
      }
    }
  }

  &__wrong {
    .check-answer__icon {
      border-color: $point;
      position: relative;

      span {
        position: absolute;
        width: calc(#{$answerBorderSize} * 1.5);
        height: $answerSizeHalf;
        background: $point;
        border-radius: rem(15);
        transform: rotate(-45deg);

        &:last-child {
          transform: rotate(45deg);
        }
      }
    }
  }
}

.is-web {
  display: block !important;
}

.is-mob {
  display: none !important;
}

// 반응형
@include tablet-ver {
  ::v-deep .el-input {
    width: 100%;
  }

  .img-box {
    &.is-active {
      .front {
        transform: rotateY(-180deg);
      }

      .back {
        transform: rotateY(0deg);
      }
    }
  }

  .bottom-group {
    margin-top: 0;
    @include flexbox($jc: center);
    flex-direction: column;

    div {
      margin-top: rem(15);
      align-self: inherit;
    }
  }

  .is-web {
    display: none !important;
  }

  .is-mob {
    display: block !important;
  }
}
</style>
