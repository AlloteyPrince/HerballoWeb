<template>
  <div>
    <div class="library-page">
      <section class="hero-section">
        <div class="hero-content">
          <h1>ULearn Library</h1>
          <p class="hero-subtitle">
            Discover the power of nature through our comprehensive plant
            database.
          </p>
          <div class="search-bar-wrapper">
            <IconSearch class="search-icon" />
            <Input
              placeholder="Search botanical names, common names, or remedies..."
              v-model="globalFilter"
              class="search-bar-hero"
            />
          </div>
        </div>
      </section>

      <section class="plants-table-section">
        <Card>
          <CardHeader class="px-6 pt-6 pb-2">
            <div class="flex items-baseline">
              <CardTitle class="text-2xl">Herbal Plants</CardTitle>
              <Badge class="ml-2 !bg-[#228C8C1A] text-primary-light">
                <span v-if="isLoading">Loading...</span>
                <span v-else-if="error">Error</span>
                <span v-else
                  >{{ table.getFilteredRowModel().rows.length }} Items</span
                >
              </Badge>
            </div>
            <CardDescription
              >Explore our curated list of medicinal plants and their
              uses.</CardDescription
            >
          </CardHeader>

          <CardContent class="px-0 pt-4 space-y-4">
            <div class="flex justify-end items-center mb-6 px-6">
              <div class="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button
                      variant="outline"
                      class="ml-auto flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    >
                      <ChevronDown class="w-4 h-4" />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                      v-for="column in table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())"
                      :key="column.id"
                      class="capitalize"
                      :checked="column.getIsVisible()"
                      @update:checked="
                        (value) => column.toggleVisibility(!!value)
                      "
                    >
                      {{ column.id }}
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div v-if="isLoading" class="loading-state">
              <div class="loading-spinner"></div>
              <p>Loading herbal plants...</p>
              <p class="animate-pulse">Please wait</p>
            </div>
            <div v-else-if="error" class="error-state">
              <div class="error-icon">⚠️</div>
              <p>{{ error }}</p>
              <p>
                Could not load data. Please check if ULearn.json exists and is
                valid.
              </p>
              <button @click="fetchPlants" class="retry-btn">
                Retry Loading
              </button>
            </div>
            <div v-else class="table-container" id="table_view">
              <Table>
                <TableHeader>
                  <TableRow
                    v-for="headerGroup in table.getHeaderGroups()"
                    :key="headerGroup.id"
                  >
                    <TableHead
                      v-for="header in headerGroup.headers"
                      :key="header.id"
                      class="table-header"
                    >
                      <FlexRender
                        v-if="!header.isPlaceholder"
                        :render="header.column.columnDef.header"
                        :props="header.getContext()"
                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <template v-if="table.getRowModel().rows?.length">
                    <TableRow
                      v-for="row in table.getRowModel().rows"
                      :key="row.id"
                      @click="goToPlantDetail(row.original)"
                      class="table-row"
                    >
                      <TableCell
                        v-for="cell in row.getVisibleCells()"
                        :key="cell.id"
                        class="table-cell"
                      >
                        <FlexRender
                          :render="cell.column.columnDef.cell"
                          :props="cell.getContext()"
                        />
                      </TableCell>
                    </TableRow>
                  </template>
                  <TableRow v-else>
                    <TableCell :colspan="4" class="no-results">
                      <div class="no-results-content">
                        <div class="no-results-icon">🌿</div>
                        <p>No herbal plants found.</p>
                        <p class="text-sm text-gray-500">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div class="pagination-section">
              <div class="pagination-info">
                {{ table.getFilteredRowModel().rows.length }} plants total
              </div>
              <div class="pagination-controls">
                <Button
                  variant="outline"
                  size="sm"
                  :disabled="!table.getCanPreviousPage()"
                  @click="table.previousPage()"
                  class="pagination-btn"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  :disabled="!table.getCanNextPage()"
                  @click="table.nextPage()"
                  class="pagination-btn"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>

    <router-view />
  </div>
</template>

<script>
import { defineComponent, h } from "vue";
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

// Import shadcn/ui components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { IconSearch } from "@/components/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-vue-next";

export default defineComponent({
  name: "LibraryPage",
  components: {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    Input,
    Badge,
    IconSearch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    ChevronDown,
  },
  data() {
    return {
      plants: [],
      isLoading: true,
      error: null,
      searchTerm: "",
      sorting: [],
      columnFilters: [],
      columnVisibility: {},
      globalFilter: "",
      table: null,
    };
  },
  watch: {
    globalFilter(newValue) {
      if (this.table) {
        this.table.setGlobalFilter(newValue);
      }
    },
    plants: {
      handler(newPlants) {
        if (this.table) {
          this.table.setOptions((prev) => ({
            ...prev,
            data: newPlants,
          }));
        }
      },
      deep: true,
    },
  },
  created() {
    this.table = useVueTable({
      data: this.plants,
      columns: this.columns(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: (row, columnId, filterValue) => {
        const plant = row.original;
        const search = String(filterValue).toLowerCase();

        // Handle commonName as array
        const commonNameString = Array.isArray(plant.commonName)
          ? plant.commonName.join(", ")
          : plant.commonName || "";

        // Handle primaryHealthBenefits as remedies
        const remediesString = Array.isArray(plant.primaryHealthBenefits)
          ? plant.primaryHealthBenefits.join(", ")
          : plant.primaryHealthBenefits || "";

        return (
          (plant.scientificName || "").toLowerCase().includes(search) ||
          commonNameString.toLowerCase().includes(search) ||
          remediesString.toLowerCase().includes(search) ||
          (plant.tagline || "").toLowerCase().includes(search)
        );
      },
      onSortingChange: (updaterOrValue) => {
        if (typeof updaterOrValue === "function") {
          this.sorting = updaterOrValue(this.sorting);
        } else {
          this.sorting = updaterOrValue;
        }
      },
      onColumnFiltersChange: (updaterOrValue) => {
        if (typeof updaterOrValue === "function") {
          this.columnFilters = updaterOrValue(this.columnFilters);
        } else {
          this.columnFilters = updaterOrValue;
        }
      },
      onColumnVisibilityChange: (updaterOrValue) => {
        if (typeof updaterOrValue === "function") {
          this.columnVisibility = updaterOrValue(this.columnVisibility);
        } else {
          this.columnVisibility = updaterOrValue;
        }
      },
      onGlobalFilterChange: (updaterOrValue) => {
        if (typeof updaterOrValue === "function") {
          this.globalFilter = updaterOrValue(this.globalFilter);
        } else {
          this.globalFilter = updaterOrValue;
        }
      },
      state: {
        sorting: () => this.sorting,
        columnFilters: () => this.columnFilters,
        columnVisibility: () => this.columnVisibility,
        globalFilter: () => this.globalFilter,
      },
    });
  },
  mounted() {
    this.fetchPlants();
  },
  methods: {
    async fetchPlants() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch("/ULearn.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Debug logging
        console.log("Fetched data:", data);
        console.log("Data type:", typeof data);
        console.log("Is array:", Array.isArray(data));

        // Handle different JSON structures
        if (Array.isArray(data)) {
          this.plants = data;
        } else if (data && typeof data === "object") {
          // If it's an object with an array property
          const possibleArrayKeys = ["plants", "data", "items"];
          let foundArray = null;

          for (const key of possibleArrayKeys) {
            if (Array.isArray(data[key])) {
              foundArray = data[key];
              break;
            }
          }

          if (foundArray) {
            this.plants = foundArray;
          } else {
            // If it's a single object, wrap it in an array
            this.plants = [data];
          }
        } else {
          throw new Error("Invalid data format received");
        }

        console.log("Final plants array:", this.plants);
        console.log("Number of plants:", this.plants.length);
      } catch (e) {
        this.error = e.message || "Error fetching ULearn.json.";
        console.error("Error fetching ULearn.json:", e);
      } finally {
        this.isLoading = false;
      }
    },
    goToPlantDetail(plant) {
      this.$router.push({
        name: "PlantDetail",
        params: { id: plant.id },
      });
    },
    columns() {
      return [
        {
          accessorKey: "scientificName",
          header: "Scientific Name",
          cell: ({ row }) =>
            h(
              "div",
              { class: "botanical-name" },
              row.getValue("scientificName") || "N/A"
            ),
        },
        {
          accessorKey: "commonName",
          header: "Common Name",
          cell: ({ row }) => {
            const commonNames = row.getValue("commonName");
            const displayName = Array.isArray(commonNames)
              ? commonNames.join(", ")
              : commonNames || "N/A";
            return h("div", { class: "common-name" }, displayName);
          },
        },
        {
          accessorKey: "primaryHealthBenefits",
          header: "Health Benefits",
          cell: ({ row }) => {
            const benefits = row.getValue("primaryHealthBenefits");
            let displayText = "";

            if (Array.isArray(benefits)) {
              displayText = benefits.join(", ");
            } else if (benefits) {
              displayText = benefits;
            } else {
              displayText = "No benefits listed";
            }

            return h(
              "div",
              { class: "remedies-cell" },
              displayText.length > 100
                ? `${displayText.substring(0, 100)}...`
                : displayText
            );
          },
        },
        {
          accessorKey: "tagline",
          header: "Description",
          cell: ({ row }) => {
            const tagline =
              row.getValue("tagline") || "No description available";
            return h(
              "div",
              { class: "description-cell" },
              tagline.length > 80 ? `${tagline.substring(0, 80)}...` : tagline
            );
          },
        },
      ];
    },
  },
});
</script>

<style scoped>
/* Global Page Styles */
.library-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f7fa 100%);
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

/* Hero Section */
.hero-section {
  background-image: url("/images/ha7.jpg");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  /* background-attachment: fixed; */
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(
      circle at 20% 80%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #ffffff, #e0f7fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.search-bar-wrapper {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  z-index: 2;
  width: 20px;
  height: 20px;
}

.search-bar-hero {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-bar-hero:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* Table Section */
.plants-table-section {
  padding: 2rem;
  max-width: 1200px;
  margin: -2rem auto 0;
  position: relative;
  z-index: 2;
}

.plants-table-section .card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  background: white;
  overflow: hidden;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #228c8c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-state {
  text-align: center;
  padding: 3rem;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 12px;
  margin: 1rem;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #228c8c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #1a6b6b;
}

/* Table Styling */
.table-container {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: white;
}

.table-container table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  background: linear-gradient(135deg, #228c8c 0%, #1a6b6b 100%);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
  text-align: left;
  white-space: nowrap;
}

.table-header:first-child {
  width: 25%;
}

.table-header:nth-child(2) {
  width: 25%;
}

.table-header:nth-child(3) {
  width: 30%;
}

.table-header:nth-child(4) {
  width: 20%;
}

.table-row {
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f3f4f6;
}

.table-row:hover {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f7fa 100%);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(34, 140, 140, 0.1);
}

.table-cell {
  padding: 1rem;
  vertical-align: middle;
  border: none;
  word-wrap: break-word;
  max-width: 0;
}

.table-cell:first-child {
  width: 25%;
}

.table-cell:nth-child(2) {
  width: 25%;
}

.table-cell:nth-child(3) {
  width: 30%;
}

.table-cell:nth-child(4) {
  width: 20%;
}

.botanical-name {
  font-weight: 600;
  color: #1f2937;
  font-style: italic;
  font-size: 0.95rem;
}

.common-name {
  color: #374151;
  font-weight: 500;
}

.remedies-cell,
.description-cell {
  color: #6b7280;
  line-height: 1.5;
  font-size: 0.9rem;
}

.description-cell {
  font-style: italic;
}

/* No Results State */
.no-results {
  padding: 0;
  border: none;
}

.no-results-content {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

/* Pagination */
.pagination-section {
  display: flex;
  items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0;
  border-top: 1px solid #f3f4f6;
  margin-top: 1rem;
}

.pagination-info {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  gap: 0.5rem;
}

.pagination-btn {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #228c8c;
  color: white;
  border-color: #228c8c;
  transform: translateY(-1px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Badge Styling */
.ml-2 {
  background: rgba(34, 140, 140, 0.1) !important;
  color: #228c8c !important;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
}

/* Card Header */
.card-header {
  background: linear-gradient(135deg, #fafafa 0%, #f9fafb 100%);
  border-bottom: 1px solid #e5e7eb;
}

.card-title {
  color: #1f2937;
  font-weight: 700;
}

.card-description {
  color: #6b7280;
  margin-top: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .plants-table-section {
    padding: 1rem;
    margin-top: -1rem;
  }

  .pagination-section {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .table-cell {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .search-bar-hero {
    font-size: 0.9rem;
    padding: 0.875rem 0.875rem 0.875rem 2.5rem;
  }
}

/* Animation for page load */
.library-page {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Table row animation */
.table-row {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
