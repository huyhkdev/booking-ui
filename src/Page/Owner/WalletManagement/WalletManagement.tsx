import { Button, Card, Input, Statistic, Table } from "antd"
import { useState, useMemo } from "react"
import { useOwnerWallet } from "../../../hooks/owner/useOwnerWallet"
import { useWithdraw } from "../../../hooks/owner/useWithdraw";
import { useQueryClient } from "@tanstack/react-query";
import { useWithdrawHistory } from "../../../hooks/owner/useWithdrawHistory";

export const WalletManagement = () => {
    const queryClient = useQueryClient()
    const { data, isLoading } = useOwnerWallet();
    const { data: withdrawHistory, isLoading: isLoadingWithdrawHistory } = useWithdrawHistory();

    const wallet = data?.data.data;
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState(false);
    const { mutate: withdraw, isPending } = useWithdraw();

    const handleWithdraw = () => {
        if (amount > wallet?.balance || amount <= 0) {
            setError(true)
        } else {
            withdraw(amount, {
                onSuccess: () => {
                    setAmount(0)
                    setError(false)
                    queryClient.invalidateQueries({ queryKey: ["owner-wallet"] })
                    queryClient.invalidateQueries({ queryKey: ["owner-withdraw-history"] })
                }
            })
        }
    }

    // State cho search
    const [searchText, setSearchText] = useState("")

    // Lọc lịch sử theo transactionID
    const filteredData = useMemo(() => {
        const allData = withdrawHistory?.data.data || []
        if (!searchText.trim()) return allData
        return allData.filter(item =>
            item.transactionID?.toLowerCase().includes(searchText.trim().toLowerCase())
        )
    }, [withdrawHistory, searchText])

    const columns = [
        {
            title: 'Mã giao dịch',
            dataIndex: 'transactionID',
            key: 'transactionID',
        },
        {
            title: 'Số tiền (VNĐ)',
            dataIndex: 'amount',
            key: 'amount',
            render: (value: number) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: string) => new Date(value).toLocaleString('vi-VN')
        }
    ];

    return <div>
        <div className="flex gap-4 justify-between">
            <Card className="w-1/2">
                <Statistic
                    loading={isLoading}
                    title='Tổng số dư ví'
                    value={wallet?.balance}
                    valueStyle={{ color: '#3f8600' }}
                    suffix={<span className="text-sm text-gray-500">VNĐ</span>}
                />
            </Card>
            <Card className="w-1/2">
                <h1>Rút tiền</h1>
                <Input placeholder="Nhập số tiền muốn rút" value={amount} onChange={(e) => {
                    const val = Number(e.target.value)
                    setAmount(val)
                    setError(val > wallet?.balance || val <= 0)
                }} />
                {error && <p className="text-red-500">Số tiền không hợp lệ</p>}
                <Button loading={isPending} onClick={handleWithdraw}>Rút tiền</Button>
            </Card>
        </div>

        <div className="mt-6">
            <h1 className="mb-2 font-semibold text-lg">Lịch sử rút tiền</h1>
            <Input.Search
                placeholder="Tìm theo mã giao dịch"
                className="mb-4 w-1/3"
                allowClear
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Table
                rowKey="_id"
                loading={isLoadingWithdrawHistory}
                dataSource={filteredData}
                columns={columns}
                pagination={{ pageSize: 5 }}
            />
        </div>
    </div>
}
