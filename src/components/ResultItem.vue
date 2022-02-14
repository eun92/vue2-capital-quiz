<template>
  <div class="result-list__item">
    <div class="img-box">
      <span class="num" v-text="item.quizCnt + '.'"><!-- 1. --></span>
      <div class="img">
        <img :src="item.flagImage" :alt="item.rightAnswer" />
      </div>
    </div>
    <div class="answer-group">
      <p class="answer">
        <span>정답 : </span>
        <span class="answer__right" v-text="item.rightAnswer">
          <!-- 가나 -->
        </span>
      </p>
      <p class="answer">
        <span>답변 : </span>
        <span class="answer__my" v-text="item.myAnswer">
          <!-- 가나 -->
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped>
.result-list {
  &__item {
    @include flexbox($ai: center);
    padding: rem(4);

    .num {
      width: rem(24);
      margin-right: rem(5);
      font-size: rem(14);
      text-align: right;
    }

    .img-box {
      @include flexbox($ai: stretch);
      margin-right: rem(10);

      .img {
        overflow: hidden;
        width: rem(80);
        height: rem(55);
        border: 1px solid #ddd;
        border-radius: rem(7);

        img {
          width: 100%;
          height: 100%;
          transform: scale(1.02);
        }
      }
    }

    .answer {
      font-size: rem(14);
      white-space: nowrap;

      &__right {
        position: relative;
        z-index: 1;

        @include after-mark-text();
      }

      &__my {
        color: $primary;
      }
    }
  }
}
</style>
