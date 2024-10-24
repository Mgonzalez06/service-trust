"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface Column {
  label: string;
  key: string;
}

interface DataRow {
  [key: string]: React.ReactNode;
}

interface CustomTableProps {
  columns: Column[];
  data: DataRow[];
}

export const CustomTable: React.FC<any> = ({ columns, data }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column: any, index: any) => (
              <TableCell key={index}>
                <Typography color="primary" fontWeight="bold">
                  {column.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any, rowIndex: any) => (
            <TableRow key={rowIndex}>
              {columns.map((column: any, colIndex: any) => (
                <TableCell key={colIndex}>
                  {column.key === "action" ? (
                    row[column.key]
                  ) : (
                    <Typography variant="body1" color="primary">
                      {row[column.key]}
                    </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
