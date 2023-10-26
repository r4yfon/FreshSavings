<script setup>
  // import { ref } from 'vue';
  // const props = defineProps({
  //   title: { type: String, required: true },
  //   ariaTitle: { type: String, required: true }
  // });
  // const showPanel = ref(false);
  // const togglePanel = (event) => {
  //   showPanel.value = !showPanel.value;
  // }
</script>

<template>
  <div class="panel container mb-4 border-2 rounded-lg shadow-sm">
      <button 
        :arial-controls="'accordion-content-' + ariaTitle"
        :id="'accordion-control-' + ariaTitle"
        @click.prevent="togglePanel" >
        <label class="radio">
          <input type="radio" name="option" value="option">
        {{ title }}
        </label>
    </button>
    <div
      :aria-hidden="!showPanel"
      :id="'content-' + ariaTitle"
      class="p-4"
      v-if="showPanel">
      <slot></slot>
    </div>
  </div>
</template>

<style>
  button{
    padding: 4;
    width: auto; 
    height:auto;  
    flex-direction: row; 
    align-items: center; 
    justify-content: normal; 
  }

  label.radio {
  cursor: pointer;
}

label.radio input {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}

label.radio span {
  padding: 1px 12px;
  border: 2px solid #ada9a9;
  display: inline-block;
  color: #8f37aa;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 300;
}


</style>