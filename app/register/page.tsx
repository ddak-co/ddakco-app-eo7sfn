'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';

interface FormData {
  name: string;
  licensePlate: string;
  type: string;
  purchaseDate: string;
  mileage: string;
}

export default function RegisterVehicle() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    licensePlate: '',
    type: '',
    purchaseDate: '',
    mileage: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.licensePlate || !formData.type || !formData.purchaseDate || !formData.mileage) {
      setMessage('모든 필드를 입력해주세요.');
      return;
    }

    setMessage('✅ 차량이 성공적으로 등록되었습니다!');
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">새 차량 등록</h2>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">차명</label>
            <Input
              type="text"
              name="name"
              placeholder="예: BMW X5"
              value={formData.name}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">번호판</label>
            <Input
              type="text"
              name="licensePlate"
              placeholder="예: 45가 1234"
              value={formData.licensePlate}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">차종</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">선택하세요</option>
              <option value="SUV">SUV</option>
              <option value="세단">세단</option>
              <option value="해치백">해치백</option>
              <option value="미니밴">미니밴</option>
              <option value="트럭">트럭</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">구매일</label>
            <Input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">현재 주행거리 (km)</label>
            <Input
              type="number"
              name="mileage"
              placeholder="예: 35000"
              value={formData.mileage}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-center font-semibold ${
              message.includes('✅')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              등록
            </Button>
            <Button
              type="button"
              onClick={() => router.push('/')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900"
            >
              취소
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
