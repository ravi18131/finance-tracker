import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import fetchApi from "@/lib/axios"

export function SectionCards() {
  const query = useQuery({
    queryKey: ["all-analytics"],
    queryFn: () => fetchApi.get(`/user/analytics`),
  })

  const analytics = query.data?.data.data ?? null
  const transactions = analytics?.transactions || []
  const monthlyTrends = analytics?.monthlyTrends || []

  // aggregate income and expense totals
  const totalIncome = monthlyTrends.reduce((sum: number, m: any) => sum + m.income, 0)
  const totalExpense = monthlyTrends.reduce((sum: number, m: any) => sum + m.expense, 0)
  const netBalance = totalIncome - totalExpense

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Transactions */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Transactions</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {transactions.length}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +8%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Activity growing <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">More usage compared to last month</div>
        </CardFooter>
      </Card>

      {/* Total Income */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Income</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ₹{totalIncome.toLocaleString()}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Healthy growth <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Revenue is increasing steadily</div>
        </CardFooter>
      </Card>

      {/* Total Expense */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Expense</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ₹{totalExpense.toLocaleString()}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              -5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Costs increasing <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Monitor spending trends</div>
        </CardFooter>
      </Card>

      {/* Net Balance */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Net Balance</CardDescription>
          <CardTitle
            className={`@[250px]/card:text-3xl text-2xl font-semibold tabular-nums ${netBalance < 0 ? "text-red-600" : "text-green-600"
              }`}
          >
            ₹{netBalance.toLocaleString()}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${netBalance < 0 ? "text-red-600" : "text-green-600"
                }`}
            >
              {netBalance < 0 ? (
                <>
                  <TrendingDownIcon className="size-3" /> Loss
                </>
              ) : (
                <>
                  <TrendingUpIcon className="size-3" /> Profit
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          {netBalance < 0 ? (
            <>
              <div className="line-clamp-1 flex gap-2 font-medium">
                Negative balance <TrendingDownIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">Expenses exceed income</div>
            </>
          ) : (
            <>
              <div className="line-clamp-1 flex gap-2 font-medium">
                Positive balance <TrendingUpIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">Business is profitable</div>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
