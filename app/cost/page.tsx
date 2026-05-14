'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';

interface CostRecord {
  id: string;
  vehicleId: string;
  type: string;
  amount: number;
  date: string;
  memo: string;
}

const DEMO_COSTS: CostRecord[] = [
  {
    id: '1',
    vehicleId: '1',
    type: '유류비',
    amount: 55000,
    date: '2024-01-15',
    memo: '휘발유 가득',
  },
  {
    id: '2',
    vehicleId: '1',
    type: '정기점검',
    amount: 150000,
    date: '2024-01-10',
    memo: '6개월 점검',
  },
];

export default function CostPage() {
  const [costs, setCosts] = useState<CostRecord[]>(DEMO_COSTS);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    memo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.type || !formData.amount) {
      alert('비용 유형과 금액을 입력해주세요.');
      return;
    }

    const newCost: CostRecord = {
      id: Date.now().toString(),
      vehicleId: '1',
      type: formData.type,
      amount: Number(formData.amount),
      date: formData.date,
      memo: formData.memo,
    };

    setCosts([newCost, ...costs]);
    setFormData({
      type: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      memo: '',
    });
    setShowForm(false);
  };

  const totalAmount = costs.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">비용 기록</h2>
          <p className="text-gray-600 mt-1">차량별 비용을 관리하세요</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {showForm ? '✕ 닫기' : '+ 비용 추가'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-6 bg-blue-50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">비용 유형</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">선택하세요</option>
                  <option value="유류비">유류비</option>
                  <option value="정기점검">정기점검</option>
                  <option value="수리비">수리비</option>
                  <option value="보험료">보험료</option>
                  <option value="등록료">등록료</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">금액 (₩)</label>
                <Input
                  type="number"
                  name="amount"
                  placeholder="0"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">날짜</label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">메모</label>
                <Input
                  type="text"
                  name="memo"
                  placeholder="예: 휘발유 가득 채움"
                  value={formData.memo}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              저장
            </Button>
          </form>
        </Card>
      )}

      <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <p className="text-sm text-gray-600">총 비용</p>
        <p className="text-4xl font-bold text-blue-600 mt-2">{totalAmount.toLocaleString()}₩</p>
      </Card>

      <div className="space-y-3">
        {costs.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">기록된 비용이 없습니다.</p>
          </Card>
        ) : (
          costs.map((cost) => (
            <Card key={cost.id} className="p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{cost.type}</p>
                  <p className="text-sm text-gray-600 mt-1">{cost.date}</p>
                  {cost.memo && <p className="text-sm text-gray-500 mt-1">{cost.memo}</p>}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{cost.amount.toLocaleString()}₩</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
