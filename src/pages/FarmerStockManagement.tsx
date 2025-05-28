
import { useState } from 'react';
import { Leaf, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const FarmerStockManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Rice Husks', quantity: 500, unit: 'kg', price: 25 },
    { id: 2, name: 'Wheat Straw', quantity: 300, unit: 'kg', price: 30 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    price: ''
  });

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.quantity && newProduct.price) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        quantity: parseInt(newProduct.quantity),
        unit: newProduct.unit,
        price: parseFloat(newProduct.price)
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', quantity: '', unit: 'kg', price: '' });
    }
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">AgriLoop</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, Farmer</span>
              <Button variant="outline" asChild>
                <Link to="/">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Management</h1>
          <p className="text-gray-600">Manage your agricultural waste products</p>
        </div>

        {/* Add New Product */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add New Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                required
              />
              <select
                className="px-3 py-2 border rounded-md"
                value={newProduct.unit}
                onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
              >
                <option value="kg">kg</option>
                <option value="tons">tons</option>
                <option value="bags">bags</option>
              </select>
              <Input
                type="number"
                step="0.01"
                placeholder="Price per unit"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Add Product
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Products List */}
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">
                      Quantity: {product.quantity} {product.unit} | Price: ₹{product.price}/{product.unit}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerStockManagement;
