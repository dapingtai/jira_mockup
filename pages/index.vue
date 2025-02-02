<template>
  <div>
    <div class="flex h-[calc(80vh-5rem)] p-16">
      <div class="flex flex-col gap-4 lg:w-1/2 lg:mx-auto">
        <h1 class="text-4xl font-bold mb-8">
          Connect every team, task and project together with Jira
        </h1>
        <div class="flex flex-col gap-4 w-1/2">
          <AppInput
            v-model="workEmail"
            label="Works mail"
            name="workMail"
          ></AppInput>
          <label class="text-gray-500 text-xs"
            >I agree to the Atlassian Customer Agreement, which incorporates by
            reference the AI Product-Specific Terms, and acknowledge the Privacy
            Policy.</label
          >
          <AppButton variant="primary" class="!rounded"
            >Get Jira free</AppButton
          >
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

    <footer class="text-center bg-gray-100 h-20vh w-full">
      <div class="flex justify-center items-center h-full">
        <h2 class="text-3xl m-auto">
          Discover the features that make Jira so easy to use
        </h2>
        <div class="flex items-center mr-4" @click="openModal">
          <Icon
            class="hover:scale-125 cursor-pointer"
            name="material-symbols:info"
            style="color: blue"
            size="36"
          ></Icon>
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
        <form
          class="flex flex-col gap-4 h-90% overflow-auto"
          @submit.prevent="onSubmit"
        >
          <div v-for="item in form" :key="item.key" class="px-2">
            <div v-if="item.type === 'image'" class="flex flex-col w-full">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >參考圖片</label
              >
              <AppImageUploader v-model="item.value" :maxImages="3" />
            </div>
            <div
              v-else-if="item.type === 'select'"
              class="flex flex-col w-full"
            >
              <AppSelectMenu
                :name="item.key"
                v-model="item.value"
                :label="item.title"
                :placeholder="item.placeholder"
                :required="item.required"
                :options="item.options"
              ></AppSelectMenu>
            </div>
            <div v-else>
              <AppInput
                :name="item.key"
                v-model="item.value"
                :label="item.title"
                :type="item.type"
                :key="item.key"
                :placeholder="item.placeholder"
                :helpText="item.helpText"
                :required="item.required"
              >
              </AppInput>
            </div>
          </div>
          <div class="absolute bottom-2 w-full">
            <AppButton variant="primary" :fullWidth="true" type="submit"
              >提交</AppButton
            >
          </div>
        </form>
      </div>
    </AppModal>

    <!-- Success Modal -->
    <AppModal
      v-model="showSuccessModal"
      title="提交成功"
      width="w-128"
      :show-header="false"
    >
      <div class="flex flex-col items-start justify-start text-center gap-8">
        <div class="flex gap-2 items-center text-green-500">
          <Icon
            name="material-symbols:check-circle"
            class="text-green-500"
            size="24"
          />
          <label class="text-lg">提交成功</label>
        </div>

        <p>感謝您的反饋，我們將繼續努力，提供更優質的服務!</p>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
const { schema } = useValidation();
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const config = useRuntimeConfig();

interface Option {
  value: string;
  label: string;
}

interface Form {
  key: string;
  title: string;
  placeholder?: string;
  type: string;
  value: any;
  helpText?: string;
  options?: Option[];
  required?: boolean;
}

const workEmail = ref<string>("");

const initForm = (): Form[] => {
  return [
    {
      key: "category",
      title: "類別",
      type: "select",
      placeholder: "請選擇類別",
      options: [
        { label: "操作問題", value: "problem" },
        { label: "優化建議", value: "advice" },
        { label: "Bug 反饋", value: "bug" },
        { label: "其他", value: "other" },
      ],
      value: "",
      required: true,
    },
    {
      key: "title",
      title: "標題",
      type: "text",
      placeholder: "請輸入標題",
      value: "",
      helpText: "(限30字符內)",
      required: true,
    },
    {
      key: "description",
      title: "描述",
      type: "text",
      placeholder: "請描述你的意見/問題",
      value: "",
      helpText: "(限300字符內)",
      required: true,
    },
    {
      key: "image",
      title: "圖片",
      type: "image",
      value: [],
      helpText: "(僅支持(PNG, JPG)格式，每張5MB內)",
      required: false,
    },
  ];
};

const form = ref<Form[]>(initForm());

const modalTitle = ref<string>("意見反饋");
const showModal = ref<boolean>(false);

const openModal = () => {
  form.value = initForm();
  showModal.value = true;
};

const showSuccessModal = ref<boolean>(false);

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

const onSubmit = handleSubmit(async (values: any) => {
  showModal.value = false;
  showSuccessModal.value = true;
  setTimeout(() => {
    closeSuccessModal();
  }, 5000);
  
  //Call API 
  const formData = new FormData();

  formData.append(
    "category",
    form.value.find((f) => f.key === "category")?.value || ""
  );
  formData.append(
    "title",
    form.value.find((f) => f.key === "title")?.value || ""
  );
  formData.append(
    "description",
    form.value.find((f) => f.key === "description")?.value || ""
  );

  const images = form.value.find((f) => f.key === "image")?.value || [];
  images.forEach((image: any, index: number) => {
    if (image.file) {
      formData.append(`image_${index}`, image.file);
    }
  });

  try {
    const response = await fetch(`${config.public.apiBase}/api/feedback`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch {
  } finally {
  }
});
</script>
