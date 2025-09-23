<template>
  <router-link 
    :to="to"
    class="group block bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
    <div class="flex items-center justify-between mb-4">
      <div :class="getIconClass(color)">
        <component :is="iconComponent" class="h-6 w-6" />
      </div>
      <div v-if="stats" class="text-right">
        <div class="text-xs text-gray-500">{{ stats.label }}</div>
        <div class="text-sm font-semibold" :class="getTextColor(color)">
          {{ stats.value }}
        </div>
      </div>
    </div>
    
    <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
      {{ title }}
    </h3>
    
    <p class="text-sm text-gray-600 mb-4">
      {{ description }}
    </p>
    
    <div class="flex items-center text-sm font-medium" :class="getTextColor(color)">
      <span>詳細を見る</span>
      <ArrowRightIcon class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </router-link>
</template>

<script setup>
import { 
  PlusCircleIcon,
  TicketIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  to: {
    type: String,
    required: true
  },
  stats: {
    type: Object,
    default: null
  }
})

const iconComponents = {
  'plus-circle': PlusCircleIcon,
  'ticket': TicketIcon,
  'clipboard-check': ClipboardDocumentCheckIcon,
  'chart': ChartBarIcon
}

const iconComponent = computed(() => iconComponents[props.icon])

const getIconClass = (color) => {
  const classes = {
    primary: 'w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center',
    info: 'w-12 h-12 bg-info/10 text-info rounded-lg flex items-center justify-center',
    warning: 'w-12 h-12 bg-warning/10 text-warning rounded-lg flex items-center justify-center',
    success: 'w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center'
  }
  return classes[color] || classes.primary
}

const getTextColor = (color) => {
  const classes = {
    primary: 'text-primary',
    info: 'text-info',
    warning: 'text-warning',
    success: 'text-success'
  }
  return classes[color] || classes.primary
}
</script>