"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useQuery } from "@tanstack/react-query"
import fetchApi from "@/lib/axios"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export default function AllUsersAnalytics() {
    const query = useQuery({
        queryKey: ["all-analytics"],
        queryFn: () => fetchApi.get(`/user/analytics`),
    })

    if (query.isLoading) return <div>Loading...</div>
    if (query.isError) return <div>Failed to load analytics</div>

    const analytics = query.data?.data.data ?? null
    const incomeData = analytics?.category?.income || []
    const expenseData = analytics?.category?.expense || []
    const monthlyTrends = analytics?.monthlyTrends || []

    // 🎨 Colors
    const COLORS = [
        "#155DFC", "#8EC5FF", "#2B7FFF", "#1447E6", "#193CB8", "#050E1A",
    ]

    //  const COLORS = ["#142E52", "#1F3D66", "#29507A", "#33628E", "#3C72B6", "#8EC5FF"]
    const makeChartConfig = (data: { category: string; total: number }[]) => {
        const config: Record<string, { label: string; color: string }> = {}
        data.forEach((item, idx) => {
            config[item.category] = {
                label: item.category,
                color: COLORS[idx % COLORS.length],
            }
        })
        return config
    }

    const incomeConfig = makeChartConfig(incomeData)
    const expenseConfig = makeChartConfig(expenseData)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Trends Line */}
            <Card className="col-span-1 md:col-span-2 w-full">
                <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                    <CardDescription>All users</CardDescription>
                </CardHeader>
                <CardContent className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#3C72B6" strokeWidth={2} />
                            <Line type="monotone" dataKey="expense" stroke="#142E52" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Income Pie */}
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Income by Category</CardTitle>
                    <CardDescription>All users</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer config={incomeConfig} className="mx-auto aspect-square max-h-[300px]">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="total" hideLabel />} />
                            <Pie data={incomeData} dataKey="total" nameKey="category">
                                {incomeData.map((entry: any, index: number) => (
                                    <Cell key={`income-${index}`} fill={incomeConfig[entry.category]?.color || COLORS[index % COLORS.length]} />
                                ))}
                                <LabelList dataKey="category" className="fill-background" fontSize={12} />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Expense Pie */}
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Expense by Category</CardTitle>
                    <CardDescription>All users</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer config={expenseConfig} className="mx-auto aspect-square max-h-[300px]">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="total" hideLabel />} />
                            <Pie data={expenseData} dataKey="total" nameKey="category">
                                {expenseData.map((entry: any, index: number) => (
                                    <Cell key={`expense-${index}`} fill={expenseConfig[entry.category]?.color || COLORS[index % COLORS.length]} />
                                ))}
                                <LabelList dataKey="category" className="fill-background" fontSize={12} />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>Income vs Expense</CardTitle>
                    <CardDescription>All users</CardDescription>
                </CardHeader>
                <CardContent className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="income" fill="#3C72B6" />
                            <Bar dataKey="expense" fill="#142E52" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
