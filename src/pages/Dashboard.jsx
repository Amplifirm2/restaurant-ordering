import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { Save, LogOut, RefreshCw, Settings } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { theme, updateTheme } = useTheme()
  const [colors, setColors] = useState(theme)
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/dashboard-login')
    }
  }, [navigate])

  const handleColorChange = (key, value) => {
    setColors(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    updateTheme(colors)
    setSavedMessage('Changes saved successfully!')
    setTimeout(() => setSavedMessage(''), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    navigate('/dashboard-login')
  }

  const handleReset = () => {
    const defaultTheme = {
      primary: '#DB2777',
      secondary: '#F9FAFB',
      text: '#1F2937',
      background: '#FFFFFF'
    }
    setColors(defaultTheme)
    updateTheme(defaultTheme)
    setSavedMessage('Theme reset to defaults!')
    setTimeout(() => setSavedMessage(''), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Improved Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-900">Theme Settings</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Customize Your Brand</h2>
            <p className="text-gray-500 text-sm mt-1">Adjust colors to match your restaurant's branding</p>
          </div>

          <div className="p-6">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Color Settings */}
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="h-12 w-24 cursor-pointer rounded-md border border-gray-300"
                      />
                      <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                        Buttons, Headers
                      </div>
                    </div>
                    <input
                      type="text"
                      value={colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 w-40 shadow-sm focus:ring-2 focus:ring-opacity-50 focus:ring-gray-200 focus:border-gray-400 focus:outline-none"
                      placeholder="#DB2777"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="h-12 w-24 cursor-pointer rounded-md border border-gray-300"
                      />
                      <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                        Page Background
                      </div>
                    </div>
                    <input
                      type="text"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 w-40 shadow-sm focus:ring-2 focus:ring-opacity-50 focus:ring-gray-200 focus:border-gray-400 focus:outline-none"
                      placeholder="#F9FAFB"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Text Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={colors.text}
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        className="h-12 w-24 cursor-pointer rounded-md border border-gray-300"
                      />
                      <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                        Content Text
                      </div>
                    </div>
                    <input
                      type="text"
                      value={colors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 w-40 shadow-sm focus:ring-2 focus:ring-opacity-50 focus:ring-gray-200 focus:border-gray-400 focus:outline-none"
                      placeholder="#1F2937"
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Preview */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <h3 className="text-lg font-medium p-4 border-b border-gray-100">Live Preview</h3>
                <div 
                  className="p-6"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <div 
                    className="rounded-lg p-4 text-white mb-6 flex justify-between items-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <div className="font-medium">Served</div>
                    <div className="text-xs opacity-80">Table 12</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium" style={{ color: colors.text }}>Margherita Pizza</h4>
                      <span style={{ color: colors.primary }} className="font-bold">$14.99</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Fresh mozzarella, tomatoes, and basil on our signature crust</p>
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 rounded-full text-white text-sm"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium" style={{ color: colors.text }}>Tiramisu</h4>
                      <span style={{ color: colors.primary }} className="font-bold">$8.99</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Classic Italian dessert with espresso and mascarpone</p>
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 rounded-full text-white text-sm"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Improved Action Buttons */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              <span>Reset to Defaults</span>
            </button>
            <div className="flex items-center space-x-4">
              {savedMessage && (
                <span className="text-green-600 text-sm bg-green-50 px-3 py-1 rounded-md border border-green-100">
                  {savedMessage}
                </span>
              )}
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Save className="w-4 h-4 mr-2" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}