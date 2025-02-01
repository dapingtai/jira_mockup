<template>
  <div class="flex gap-4 items-center flex-wrap">
    <!-- Preview Section -->
    <slot v-if="images.length > 0">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative group w-32 h-32"
      >
        <img
          :src="image.url"
          class="w-full h-full object-cover border-2 border-gray-300 rounded-lg"
        />
        <div
          class="absolute top-1/2 -translate-y-1/2 mx-auto flex justify-center gap-4 w-full group-hover:opacity-100 transition-opacity"
        >
          <Icon
            class="hover:scale-125 cursor-pointer"
            name="material-symbols:zoom-in"
            size="24"
            style="color: white"
            @click="openPreview(index)"
          />
          <Icon
            class="hover:scale-125 cursor-pointer"
            name="ic:baseline-delete"
            size="24"
            style="color: white"
            @click.stop="removeImage(index)"
          />
        </div>
      </div>
    </slot>

    <!-- Upload Section -->
    <div v-if="images.length < maxImages" class="flex">
      <label
        class="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        :class="{ 'bg-blue-50 border-blue-300': isDragging }"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <Icon name="material-symbols:add" size="36" style="color: gray" />
        </div>
        <input
          type="file"
          class="hidden"
          accept="image/*"
          multiple
          @change="handleFileUpload"
        />
      </label>
    </div>

    <!-- Preview Modal -->
    <AppModal v-model="showPreview" :title="'團片預覽'" :width="'max-w-fit'">
      <img
        v-if="selectedImage"
        :src="selectedImage.url"
        class="max-w-[50vw] max-h-[80vh] object-contain"
      />
    </AppModal>
  </div>

  <div v-if="maxImages" class="mt-1">
    <label class="text-xs font-bold text-gray-500"
      >可提供意見/問題截圖(上傳數量
      <span class="text-green-500">{{ images.length }}</span
      >/{{ maxImages }})</label
    >
  </div>
</template>

<script setup lang="ts">
interface ImageData {
  url: string;
  file: File;
}

const props = withDefaults(
  defineProps<{
    modelValue: ImageData[];
    maxImages: number;
  }>(),
  {
    modelValue: [],
    maxImages: 2,
  }
);

const emit = defineEmits(["update:modelValue"]);
const images = ref<ImageData[]>(props.modelValue || []);

watch(
  images,
  (newImages) => {
    emit("update:modelValue", newImages);
  },
  { deep: true }
);

const showPreview = ref(false);
const selectedImage = ref<ImageData | null>(null);
const isDragging = ref(false);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  Array.from(target.files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        images.value.push({
          url: e.target.result,
          file: file,
        });
      }
    };
    reader.readAsDataURL(file);
  });
};

const openPreview = (index: number) => {
  selectedImage.value = images.value[index];
  showPreview.value = true;
};

const removeImage = (index: number) => {
  images.value.splice(index, 1);
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (!files?.length) return;

  Array.from(files).forEach((file) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        images.value.push({
          url: e.target.result,
          file: file,
        });
      }
    };
    reader.readAsDataURL(file);
  });
};
</script>
