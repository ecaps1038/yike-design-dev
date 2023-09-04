## /yike-design-dev/CONTRIBUTING.md

```vue: CONTRIBUTING
<template>
  <DocPage>#{content}#</DocPage>
</template>
```

## demo/src/\*

```vue: default
<script setup>
#{importContent}#
</script>

<template>
  <DocPage>#{content}#</DocPage>
</template>
```

```vue: snippet
<yk-snippet title="#{title}#" code="#{demoCode}#">
  <template v-slot:demo>#{demoName}#</template>
  <template v-slot:desc>#{content}#</template>
</yk-snippet>
```

```vue: pure
<div class="yk-pure-doc">#{demoName}#</div>
```
