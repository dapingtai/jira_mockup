<template>
  <div>
    <div class="flex h-[calc(80vh-5rem)] p-16">
      <div class="flex flex-col gap-4 lg:w-1/2 lg:mx-auto">
        <h1 class="text-4xl font-bold mb-8">Connect every team, task and project together with Jira</h1>
        <div class="flex flex-col gap-4 w-1/2">
          <AppInput label="Works mail"></AppInput>
          <label class="text-gray-500 text-xs">I agree to the Atlassian Customer Agreement, which incorporates by reference the AI Product-Specific Terms, and acknowledge the Privacy Policy.</label>
          <AppButton variant="primary" class="!rounded">Get Jira free</AppButton>
          <AppDivider><span class="mx-2">Or sign up with</span></AppDivider>
        </div>
        <div class="flex flex-col gap-2 w-1/2">
          <div class="flex gap-2 w-full">
            <AppButton class="flex-grow w-1/2">
              <div class="flex gap-2 justify-center items-center">
                <Icon name="logos:google-icon" size="24"></Icon>
                <label>Google</label>
              </div>
            </AppButton>
            <AppButton class="flex-grow w-1/2">
              <div class="flex gap-2 justify-center items-center">
                <Icon name="logos:microsoft-icon" size="24"></Icon>
                <label>MicroSoft</label>
              </div>
            </AppButton>
          </div>
          <div class="flex gap-2 w-full">
            <AppButton class="flex-grow w-1/2">
              <div class="flex gap-2 justify-center items-center">
                <Icon name="logos:apple" size="24"></Icon>
                <label>Apple</label>
              </div>
            </AppButton>
            <AppButton class="flex-grow w-1/2">
              <div class="flex gap-2 justify-center items-center">
                <Icon name="logos:slack-icon" size="24"></Icon>
                <label>Slack</label>
              </div>
            </AppButton>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Cards Section -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <AppCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        :image-url="card.imageUrl"
      >
        <button 
          @click="openModal(card)"
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Learn More
        </button>
      </AppCard>
    </div> -->

    <!-- <AppImageUploader></AppImageUploader> -->

    <footer class="text-center bg-gray-100 h-20vh w-full">
      <div class="flex justify-center items-center h-full">
        <h2 class="text-3xl m-auto">
          Discover the features that make Jira so easy to use
        </h2>
        <div class="flex items-center mr-4" @click="openModal">
          <Icon class="hover:scale-125 cursor-pointer" name="material-symbols:info" style="color: blue" size="36"></Icon>
        </div>
      </div>
    </footer>

    <!-- Feedback Modal -->
    <AppModal
      v-model="showModal"
      :title="modalTitle"
      width="w-80% md:w-1/2 lg:w-1/3"
    >
      <div class="relative h-80vh">
        <form class="flex flex-col gap-4 h-90% overflow-auto">
          <div v-for="item in form" :key="item.key" class="px-2">
            <div v-if="item.type === 'image'" class="flex flex-col w-full">
              <label class="block text-sm font-medium text-gray-700 mb-1">參考圖片</label>
              <AppImageUploader v-model="item.value" :maxImages="3" />
            </div>
            <div v-else-if="item.type === 'select'" class="flex flex-col w-full">
              <AppSelectMenu
                v-model="item.value"
                :label="item.title"
                :placeholder="item.placeholder"
                :options="item.options"
              ></AppSelectMenu>
            </div>
            <div v-else>
              <AppInput
                v-model="item.value"
                :label="item.title"
                :type="item.type"
                :key="item.key"
                :placeholder="item.placeholder"
                :helpText="item.helpText"
              ></AppInput>
            </div>
          </div>
          <div class="absolute bottom-2 w-full">
            <AppButton variant="primary" :fullWidth="true">提交</AppButton>
          </div>
        </form>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
// interface Card {
//   id: number
//   title: string
//   description: string
//   imageUrl?: string
// }

// const cards: Card[] = [
//   {
//     id: 1,
//     title: "First Card",
//     description: "This is the first card description.",
//     imageUrl: "https://picsum.photos/400/300?random=1"
//   },
//   {
//     id: 2,
//     title: "Second Card",
//     description: "This is the second card description.",
//     imageUrl: "https://picsum.photos/400/300?random=2"
//   },
//   {
//     id: 3,
//     title: "Third Card",
//     description: "This is the third card description.",
//     imageUrl: "https://picsum.photos/400/300?random=3"
//   }
// ]

const form = ref([
  {
    key: 'category',
    title: '類別',
    type: 'select',
    placeholder: '請選擇類別',
    options: [
      { label: '操作問題', value: 'problem' },
      { label: '優化建議', value: 'advice' },
      { label: 'Bug 反饋', value: 'bug' },
      { label: '其他', value: 'other' },
    ],
    value: null
  },
  {
    key: 'title',
    title: '標題',
    type: 'text',
    placeholder: '請輸入標題',
    value: '',
    helpText: '(限30字符內)'
  },
  {
    key: 'description',
    title: '描述',
    type: 'text',
    placeholder: '請描述你的意見/問題',
    value: '',
    helpText: '(限300字符內)'
  },
  {
    key: 'image',
    title: '圖片',
    type: 'image',
    value: [],
    helpText: '(僅支持(PNG, JPG)格式，每張5MB內)'
  }
])

const modalTitle = ref<string>('意見反饋')
const showModal = ref<boolean>(false)
// const selectedCard = ref<Card | null>(null)

const openModal = () => {
  showModal.value = true
}
</script>