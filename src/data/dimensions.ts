import type { Dimension } from './types';

export const dimensions: Dimension[] = [
  { key: "内向外向", description: "内向-外向倾向", lowLabel: "内向", highLabel: "外向" },
  { key: "活跃度", description: "沉稳-活跃倾向", lowLabel: "沉稳", highLabel: "活跃" },
  { key: "冒险性", description: "保守-冒险倾向", lowLabel: "保守", highLabel: "冒险" },
  { key: "社交性", description: "独立-社交倾向", lowLabel: "独立", highLabel: "社交" },
  { key: "依赖性", description: "独立-依赖倾向", lowLabel: "独立", highLabel: "依赖" },
  { key: "领导力", description: "追随-领导倾向", lowLabel: "追随", highLabel: "领导" },
  { key: "情绪稳定性", description: "波动-稳定倾向", lowLabel: "波动", highLabel: "稳定" },
  { key: "冲动性", description: "理性-冲动倾向", lowLabel: "理性", highLabel: "冲动" },
  { key: "计划性", description: "随性-计划倾向", lowLabel: "随性", highLabel: "计划" },
  { key: "攻击性", description: "温和-攻击倾向", lowLabel: "温和", highLabel: "攻击" },
  { key: "幽默感", description: "严肃-幽默倾向", lowLabel: "严肃", highLabel: "幽默" },
  { key: "自控力", description: "放任-自控倾向", lowLabel: "放任", highLabel: "自控" },
  { key: "创造力", description: "执行-创造倾向", lowLabel: "执行", highLabel: "创造" },
  { key: "适应性", description: "固定-适应倾向", lowLabel: "固定", highLabel: "适应" },
  { key: "乐观度", description: "悲观-乐观倾向", lowLabel: "悲观", highLabel: "乐观" }
];

export const dimensionKeys = dimensions.map(d => d.key);