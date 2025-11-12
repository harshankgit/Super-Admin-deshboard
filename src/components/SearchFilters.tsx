import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface FilterOption {
  label: string;
  value: string;
}

interface SearchFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    key: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
  onReset?: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  onReset
}) => {
  return (
    <Box p={2} mb={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label={searchPlaceholder}
            variant="outlined"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon color="action" />
            }}
          />
        </Grid>
        {filters.map((filter, index) => (
          <Grid item xs={12} md={4} key={filter.key}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{filter.label}</InputLabel>
              <Select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value as string)}
                label={filter.label}
              >
                <MenuItem value="all">All {filter.label}</MenuItem>
                {filter.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
        {onReset && (
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="outlined" onClick={onReset}>
              Reset Filters
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SearchFilters;