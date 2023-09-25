<template>
  <el-dialog width="600px" :title="title" :visible.sync="m_visible">
    <el-form ref="form" label-position="right" label-width="80px" :rules="formRules" :model="form">
      <el-form-item :disabled="roleCodeDisabled" label="角色代码" prop="roleCode">
        <el-input v-model="form.roleCode" placeholder="角色代码"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="desc">
        <el-input v-model="form.desc" placeholder="角色描述"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.note" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="授权">
        <el-cascader @change="handleChange" collapse-tags v-model="form.power" :options="options" :props="{ multiple: true, expandTrigger: 'hover' }"
          clearable></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    form: {
      type: Object,
      required: true
    },
    roleCodeDisabled: {
      type: Boolean,
      default: false
    },
    handleSubmit: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      formRules: {
        roleCode: [
          { required: true, message: '角色代码不得为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '角色名称不得为空', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: '医疗服务',
          label: '医疗服务',
          children: [
            {
              value: '体检',
              label: '体检',
            },
            {
              value: '门诊',
              label: '门诊'
            },
            {
              value: '随访',
              label: '随访'
            },
            {
              value: '住院',
              label: '住院'
            }
          ]
        },
        {
          value: '权限管理',
          label: '权限管理',
          children: [
            {
              value: '用户管理',
              label: '用户管理'
            },
            {
              value: '角色管理',
              label: '角色管理'
            },
            {
              value: '菜单管理',
              label: '菜单管理'
            },
            {
              value: '部门管理',
              label: '部门管理'
            }
          ]
        },
        {
          value: '系统管理',
          label: '系统管理',
          children: [
            {
              value: '日志管理',
              label: '日志管理'
            },
            {
              value: '字典管理',
              label: '字典管理'
            }
          ]
        }
      ],
      m_visible: null
    }
  },
  watch: {
    visible(newVal) {
      this.m_visible = newVal;
    },
    m_visible(newVal) {
      this.$emit('update:visible',newVal);
    }
  },
  methods: {
    handleCancel() {
      this.$emit('close', false);
    },
    handleChange() {
      console.log(document.querySelector('.el-cascader__tags'));
    }
  }
}
</script>

<style lang="less" scoped></style>