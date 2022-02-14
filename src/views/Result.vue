<template>
  <div class="content result">
    <div class="result__head">
      <h1 class="result__title">결과</h1>
      <el-button
        class="result__btn-home"
        type="primary"
        plain
        @click="goHome()"
      >
        <span class="material-icons-round icon"> home </span>
        <span class="text">HOME</span>
      </el-button>
    </div>
    <div class="result__score">
      <strong v-text="rightAnswerResult.length"><!-- 20 --></strong> /
      <span v-text="quizLength"><!-- 50 --></span>
    </div>
    <div class="result__group">
      <div class="result__content">
        <div class="result-list">
          <h2 class="result-list__title">정답</h2>
          <result-item
            v-for="(item, index) in rightAnswerResult"
            :key="index"
            :item="item"
          ></result-item>
        </div>
      </div>
      <div class="result__content is-wrong">
        <div class="result-list">
          <h2 class="result-list__title">오답</h2>
          <result-item
            v-for="(item, index) in wrongAnswerResult"
            :key="index"
            :item="item"
          ></result-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import ResultItem from "../components/ResultItem.vue"

export default {
  components: { ResultItem },
  computed: {
    ...mapState(["quizLength", "rightAnswerResult", "wrongAnswerResult"]),
  },
  methods: {
    // 홈으로
    goHome() {
      this.$router.push("/")
    },
  },
}
</script>

<style lang="scss">
.result {
  &__head {
    position: relative;
    width: 100%;
    text-align: center;
    margin: 0 0 rem(10);
  }

  &__title {
    font-size: rem(40);
  }

  &__btn-home {
    position: absolute;
    bottom: 0;
    right: 0;

    .text {
      margin-left: rem(5);
    }
  }

  &__score {
    width: 100%;
    margin-bottom: rem(10);
    padding: rem(3);
    background: #f6f6f6;
    text-align: center;
    border-radius: rem(9);

    strong {
      font-size: rem(26);
      color: $primary;
    }

    span {
      color: #747474;
    }
  }

  &__group {
    @include flexbox($ai: stretch);
    padding-right: rem(20);
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  &__content {
    flex: 1;
    padding: rem(10);

    &.is-wrong {
      .result-list__title {
        background: $point;
        color: #fff;
      }

      .answer {
        font-size: rem(15);

        &__my {
          color: $point;
        }
      }
    }
  }
}

.result-list {
  @include flexbox($ai: start);
  flex-direction: column;

  &__title {
    display: inline-block;
    margin: 0 auto rem(10);
    padding: rem(3) rem(15);
    font-size: rem(16);
    background: $primary;
    color: $primaryFont;
    border-radius: rem(30);
    font-weight: 400;
  }
}

// 반응형
@include tablet-ver {
  .result__group {
    flex-direction: column;
  }
}
</style>
