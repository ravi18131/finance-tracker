"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import fetchApi from "@/lib/axios"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Tooltip } from "@/components/ui/tooltip"


export default function AnalyticDetail() {
    const { userId } = useParams<{ userId: string }>()

    const query = useQuery({
        queryKey: ["users-analytics", userId],
        queryFn: () => fetchApi.get(`/admin/analytics/category/user/${userId}`),
    })

    if (query.isLoading) return <div>Loading...</div>
    if (query.isError) return <div>Failed to load analytics</div>

    const userWithAnalytics = query.data?.data.data ?? null;
    const incomeData = userWithAnalytics?.category?.income || [];
    const expenseData = userWithAnalytics?.category?.expense || [];
    const monthlyTrends = userWithAnalytics?.monthlyTrends || [];


    // 🎨 Monochrome palette based on #142E52
    const INCOME_COLORS = [
        "#155DFC", "#8EC5FF", "#2B7FFF", "#1447E6", "#193CB8", "#050E1A",
    ]

    const EXPENSE_COLORS = [
        "#8EC5FF", "#2B7FFF", "#155DFC", "#1447E6", "#193CB8", "#050E1A",
    ]

    // Generic config builder
    const makeChartConfig = (
        data: { category: string; total: number }[],
        palette: string[]
    ) => {
        const config: Record<string, { label: string; color: string }> = {}
        data.forEach((item, idx) => {
            config[item.category] = {
                label: item.category,
                color: palette[idx % palette.length],
            }
        })
        return config
    }

    const incomeConfig = makeChartConfig(incomeData, INCOME_COLORS)
    const expenseConfig = makeChartConfig(expenseData, EXPENSE_COLORS)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Income Chart */}
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Income by Category</CardTitle>
                    <CardDescription>User income distribution</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={incomeConfig}
                        className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent nameKey="total" hideLabel />}
                            />
                            <Pie data={incomeData} dataKey="total" nameKey="category">
                                {incomeData.map((entry: any, index: number) => (
                                    <Cell
                                        key={`cell-income-${index}`}
                                        fill={
                                            incomeConfig[entry.category]?.color ||
                                            INCOME_COLORS[index % INCOME_COLORS.length]
                                        }
                                    />
                                ))}
                                <LabelList
                                    dataKey="category"
                                    className="fill-background"
                                    stroke="none"
                                    fontSize={12}
                                    formatter={(value: keyof typeof incomeConfig) =>
                                        incomeConfig[value]?.label
                                    }
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 leading-none font-medium">
                        Total categories: {incomeData.length}{" "}
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Income analytics grouped by category
                    </div>
                </CardFooter>
            </Card>

            {/* Expense Chart */}
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Expense by Category</CardTitle>
                    <CardDescription>User expense distribution</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={expenseConfig}
                        className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent nameKey="total" hideLabel />}
                            />
                            <Pie data={expenseData} dataKey="total" nameKey="category">
                                {expenseData.map((entry: any, index: number) => (
                                    <Cell
                                        key={`cell-expense-${index}`}
                                        fill={
                                            expenseConfig[entry.category]?.color ||
                                            EXPENSE_COLORS[index % EXPENSE_COLORS.length]
                                        }
                                    />
                                ))}
                                <LabelList
                                    dataKey="category"
                                    className="fill-background"
                                    stroke="none"
                                    fontSize={12}
                                    formatter={(value: keyof typeof expenseConfig) =>
                                        expenseConfig[value]?.label
                                    }
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 leading-none font-medium">
                        Total categories: {expenseData.length}{" "}
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Expense analytics grouped by category
                    </div>
                </CardFooter>
            </Card>

            {/* ---------------- Line Chart: Monthly Trends ---------------- */}
            <Card className="col-span-1 md:col-span-2 w-full">
                <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                    <CardDescription>Income vs Expense over time</CardDescription>
                </CardHeader>
                <CardContent className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="income"
                                stroke="#3C72B6"
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="expense"
                                stroke="#112746"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* ---------------- Bar Chart: Income vs Expense ---------------- */}
            <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>Income vs Expense</CardTitle>
                    <CardDescription>Monthly comparison</CardDescription>
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
                            <Bar dataKey="expense" fill="#112746" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
