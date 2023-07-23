<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a
          class="page-link"
          :class="{
            disabled: !pages.has_pre
          }"
          href="#"
          aria-label="Previous"
          @click.prevent="previousPage(pages.current_page)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          :class="{
            disabled: !pages.has_next
          }"
          @click.prevent="nextPage(pages.current_page)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages'],
  data() {
    return {
      test: {}
    }
  },
  methods: {
    updatePage(page) {
      console.log(page)
      this.$emit('emit-pages', page)
    },
    nextPage(page) {
      console.log('test', page)
      this.$emit('emit-pages', page + 1)
    },
    previousPage(page) {
      this.$emit('emit-pages', page - 1)
    }
  }
}
</script>
