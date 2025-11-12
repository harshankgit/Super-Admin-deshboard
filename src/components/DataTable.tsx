import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Chip
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface DataTableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}

interface DataTableProps {
  columns: DataTableColumn[];
  data: any[];
  title?: string;
  onSearch?: (searchTerm: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  chipColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
  onSearch,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data found',
  chipColor = 'default'
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Paper>
      {(title || onSearch) && (
        <Box p={2}>
          {title && <Typography variant="h6" component="h2" gutterBottom>{title}</Typography>}
          {onSearch && (
            <TextField
              fullWidth
              label={searchPlaceholder}
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Box>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} width={column.width}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={row.id || index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : typeof row[column.key] === 'boolean'
                        ? row[column.key] ? 'Yes' : 'No'
                        : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;