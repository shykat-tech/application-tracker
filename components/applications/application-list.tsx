import { Application } from "@/types/application";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { formatDate } from "../../lib/date";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link04Icon } from "@hugeicons/core-free-icons";
interface ApplicationListProps {
  applications: Application[];
}

const paymentStatus = [
  {
    label: "Not Required",
    status: "not-required",
    color: "bg-gray-500/10 text-gray-500",
  },
  {
    label: "Pending",
    status: "pending",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    label: "Paid",
    status: "paid",
    color: "bg-green-500/10 text-green-500",
  },
];

export const ApplicationList = ({ applications }: ApplicationListProps) => {
  return (
    <>
      {applications.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No applications found. Please add some applications.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-90">Application Name</TableHead>
                <TableHead className="min-w-40">Type</TableHead>
                <TableHead className="min-w-40">Circular</TableHead>
                <TableHead className="min-w-40">Status</TableHead>
                <TableHead className="min-w-40">Payment Info</TableHead>
                <TableHead className="min-w-40">Applied Date</TableHead>
                <TableHead className="min-w-40">
                  Last Application Date
                </TableHead>
                <TableHead className="min-w-40">Days Left</TableHead>
                <TableHead className="min-w-40">Documents</TableHead>
                <TableHead className="min-w-40">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app, i) => (
                <TableRow key={app.id}>
                  <TableCell className="flex items-center gap-2">
                    <span>
                      #{i + 1} - {app.name}
                    </span>
                  </TableCell>
                  <TableCell className="capitalize">
                    {app.applicationType}
                  </TableCell>
                  <TableCell>
                    {app.circularUrl && (
                      <Link
                        href={app.circularUrl}
                        className="flex items-center gap-1 text-sm hover:underline"
                        target="_blank"
                      >
                        Link <HugeiconsIcon icon={Link04Icon} size={16} />
                      </Link>
                    )}
                  </TableCell>
                  <TableCell className="capitalize">{app.status}</TableCell>
                  <TableCell className="">
                    <span className="block text-xs ">
                      Status:{" "}
                      <Badge
                        className={
                          paymentStatus.find(
                            (status) => status.status === app.paymentStatus,
                          )?.color
                        }
                      >
                        {app.paymentStatus}
                      </Badge>
                    </span>
                    {app.payAmount && (
                      <span className="block text-xs ">
                        Amount:{" "}
                        <span className="text-xs text-muted-foreground">{`${app.payAmount} Tk`}</span>
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(app.appliedDate)}</TableCell>
                  <TableCell>{formatDate(app.lastApplicationDate)}</TableCell>
                  <TableCell>
                    {app.daysLeft && (
                      <span
                        className={
                          app.daysLeft !== undefined && app.daysLeft <= 0
                            ? "text-red-500"
                            : ""
                        }
                      >
                        {app.daysLeft <= 0 ? "Expired" : app.daysLeft}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};
