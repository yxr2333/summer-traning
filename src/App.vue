<script lang="tsx" type="text/tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <router-view />
      </div>
    );
  },
});
</script>
