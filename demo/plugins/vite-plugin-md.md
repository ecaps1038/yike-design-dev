## demo/src/packages/\*

```vue: default
<script setup>
#{importContent}#
</script>

<template>
  <component-page>#{content}#</component-page>
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
