'use client';

import Card from '@/components/ui/card';

interface CostData {
  month: string;
  유류비: number;
  정기점검: number;
  수리비: number;
}

const COST_DATA: CostData[] = [
  { month: '1월', 유류비: 110000, 정기점검: 150000, 수리비: 0 },
  { month: '2월', 유류비: 85000, 정기점검: 0, 수리비: 50000 },
  { month: '3월', 유류비: 95000, 정기점검: 0, 수리비: 0 },
];

const maxValue = Math.max(
  ...COST_DATA.flatMap((d) => [d.유류비, d.정기점검, d.수리비])
);

export default function StatisticsPage() {
  const totalCosts = COST_DATA.reduce(
    (acc, month) => ({
      유류비: acc.유류비 + month.유류비,
      정기점검: acc.정기점검 + month.정기점검,
      수리비: acc.수리비 + month.수리비,
    }),
    { 유류비: 0, 정기점검: 0, 수리비: 0 }
  );

  const grandTotal = Object.values(totalCosts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">통계 분석</h2>
        <p className="text-gray-600 mt-1">차량 비용 현황을 확인하세요</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <p className="text-sm text-gray-600">총 비용</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{grandTotal.toLocaleString()}₩</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100">
          <p className="text-sm text-gray-600">유류비</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">{totalCosts.유류비.toLocaleString()}₩</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <p className="text-sm text-gray-600">정기점검</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{totalCosts.정기점검.toLocaleString()}₩</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
          <p className="text-sm text-gray-600">수리비</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{totalCosts.수리비.toLocaleString()}₩</p>
        </Card>
      </div>

      {/* 그래프 */}
      <Card className="p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">월별 비용 추이</h3>
        <div className="space-y-6">
          {COST_DATA.map((data) => (
            <div key={data.month}>
              <p className="text-sm font-semibold text-gray-900 mb-3">{data.month}</p>
              <div className="flex gap-1 h-10">
                {[
                  { label: '유류비', value: data.유류비, color: 'bg-amber-400' },
                  { label: '정기점검', value: data.정기점검, color: 'bg-purple-400' },
                  { label: '수리비', value: data.수리비, color: 'bg-red-400' },
                ].map((item) => {
                  const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                  return (
                    <div
                      key={item.label}
                      className={`${item.color} rounded transition-all`}
                      style={{ width: `${percentage || 5}%` }}
                      title={`${item.label}: ${item.value.toLocaleString()}₩`}
                    />
                  );
                })}
              </div>
