
import { useState } from 'react';
import { Leaf, ShoppingCart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const CompanyBuyProduct = () => {
  const [products] = useState([
    { id: 1, name: 'Rice Husks', farmer: 'John Farm', quantity: 500, unit: 'kg', price: 25, location: 'Punjab' },
    { id: 2, name: 'Wheat Straw', farmer: 'Green Valley Farm', quantity: 300, unit: 'kg', price: 30, location: 'Haryana' },
    { id: 3, name: 'Corn Stover', farmer: 'Sunrise Agriculture', quantity: 750, unit: 'kg', price: 22, location: 'Uttar Pradesh' },
    { id: 4, name: 'Sugarcane Bagasse', farmer: 'Sweet Harvest', quantity: 1000, unit: 'kg', price: 18, location: 'Maharashtra' },
  ]);

  const [cart, setCart] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (productId: number) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(id => id !== productId));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                  {cart.length}
                </span>
              </div>
              <span className="text-gray-700">Welcome, Company</span>
              <Button variant="outline" asChild>
                <Link to="/">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy Agricultural Products</h1>
          <p className="text-gray-600">Browse and purchase sustainable agricultural waste materials</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>
                  by {product.farmer} • {product.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{product.quantity} {product.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-green-600">₹{product.price}/{product.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Value:</span>
                    <span className="font-bold">₹{product.quantity * product.price}</span>
                  </div>
                  
                  {cart.includes(product.id) ? (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Cart Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cart.map(productId => {
                  const product = products.find(p => p.id === productId);
                  return product ? (
                    <div key={productId} className="flex justify-between">
                      <span>{product.name}</span>
                      <span>₹{product.quantity * product.price}</span>
                    </div>
                  ) : null;
                })}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>
                    ₹{cart.reduce((total, productId) => {
                      const product = products.find(p => p.id === productId);
                      return total + (product ? product.quantity * product.price : 0);
                    }, 0)}
                  </span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyBuyProduct;
