import React, { useState } from 'react';
import { Check, AlertCircle, Globe, Search, ChevronDown, ChevronUp, Edit } from 'lucide-react';

interface ProductReport {
  id: string;
  title: string;
  url: string;
  originalDescription: string;
  seo: {
    strengths: {
      [key: string]: string;
    };
    issues: {
      [key: string]: string;
    };
    recommendations: string[];
  };
  geo: {
    strengths: {
      [key: string]: string;
    };
    gaps: {
      [key: string]: string;
    };
    recommendations: string[];
  };
  descriptionOptions: {
    seoPrioritized: string;
    geoPrioritized: string;
    balanced: string;
  };
}

interface SEOGeoReportProps {
  data?: ProductReport[];
}

const SEOGeoReport: React.FC<SEOGeoReportProps> = ({ data: externalData }) => {
  const [selectedDescriptions, setSelectedDescriptions] = useState<Record<string, string>>({});
  const [customDescriptions, setCustomDescriptions] = useState<Record<string, string>>({});
  const [showCustomInput, setShowCustomInput] = useState<Record<string, boolean>>({});
  const [expandedProducts, setExpandedProducts] = useState<Record<string, boolean>>({});
  const [completedItems, setCompletedItems] = useState<Record<string, Set<string>>>({});
  const [selectedTodos, setSelectedTodos] = useState<Record<string, Set<string>>>({});

  // Sample data using actual Calvin Klein report structure
  const sampleProducts: ProductReport[] = [
    {
      id: 'ck-001',
      title: 'Wool Blend Belted Wrap Coat',
      url: 'https://www.calvinklein.us/en/women/apparel/womens-outerwear/wool-blend-belted-wrap-coat/44D595G-PAI.html',
      originalDescription: 'Tailored from a warm wool blend, this coat wraps at the front and ties with a belt at the waist. A relaxed silhouette to effortlessly layer above outfits through the cold seasons. This coat is framed with notch lapels and detailed with welt pockets at the sides.',
      seo: {
        strengths: {
          'Title Tag': 'The title tag "Wool Blend Belted Wrap Coat | Calvin Klein" is clear, keyword-rich, and within the recommended character limit (42 characters).',
          'H1 Heading': 'A relevant <h1> heading "Wool Blend Belted Wrap Coat" is present and accurately describes the product.',
          'Indexability': 'The page includes <meta name="robots" content="index,follow">, indicating that search engines are allowed to index the page and follow its links.',
          'Internal Linking': 'The page features a comprehensive navigation menu and a "Style With" section, providing good internal linking to other relevant products and categories.'
        },
        issues: {
          'Meta Description Length': 'The meta description is 260 characters long, exceeding the recommended limit of 160 characters. This may lead to truncation in search results.',
          'Missing Canonical Tag': 'There is no <link rel="canonical"> tag present on the page. This can lead to duplicate content issues if the page is accessible via multiple URLs.',
          'Image Alt Tags': 'Many images, including the main product image, have missing, generic, or non-descriptive alt text. This negatively impacts accessibility and SEO.'
        },
        recommendations: [
          'Shorten the meta description to under 160 characters, ensuring it remains informative and enticing.',
          'Implement a canonical tag on the page, pointing to the preferred version of the URL, to prevent duplicate content issues.',
          'Add descriptive and keyword-rich alt text to all images, especially the main product image, to improve accessibility and search engine understanding.'
        ]
      },
      geo: {
        strengths: {
          'Indexability': 'The page includes <meta name="robots" content="index,follow">, indicating that search engine bots are allowed to crawl and index the page.',
          'Clear Title Tag': 'The title tag "Wool Blend Belted Wrap Coat | Calvin Klein" is descriptive and clearly states the product and brand.',
          'Descriptive Meta Description': 'The meta description provides a good summary of the product which helps AI understand the content.',
          'Structured Product Information': 'The "About" and "Details" sections provide clear, concise information with bullet points that are easily parsable by LLMs.',
          'Brand Authority': 'Calvin Klein\'s domain carries significant authority, positively influencing retrievability in AI search results.'
        },
        gaps: {
          'Lack of Structured Data': 'The page does not utilize schema.org markup (Product, Offer, or AggregateRating schema) in JSON-LD format. AI models must infer information from unstructured text.',
          'No Q&A Section': 'There isn\'t a dedicated Q&A or FAQ section. Pages with explicit Q&A content are more likely to be cited as sources.',
          'Limited Unique Content': 'Content is primarily product features. No styling tips, material benefits, or sustainability information that could answer broader queries.'
        },
        recommendations: [
          'Implement Product Schema Markup using JSON-LD to define the coat\'s name, description, image, brand, price, and availability.',
          'Add a "Key Features" section highlighting main benefits (warmth of wool blend, versatility of wrap style, comfort).',
          'Develop a FAQ section with 2-3 common questions and mark up with FAQPage schema for maximum AI visibility.',
          'Enhance product description with context about ideal use cases and target audience for better AI understanding.'
        ]
      },
      descriptionOptions: {
        seoPrioritized: 'Discover the Calvin Klein Women\'s Wool Blend Wrap Coat, an essential for cold seasons. This luxurious, tailored wool blend coat offers superior warmth and sophisticated style. Featuring an elegant wrap front and an adjustable belted waist, it creates a flattering, relaxed silhouette. Designed with classic notch lapels and practical welt pockets, this premium winter outerwear piece effortlessly layers over any outfit. Elevate your cold-weather wardrobe with this modern, minimalist Calvin Klein coat.',
        geoPrioritized: 'This Calvin Klein coat is a wool blend wrap style. It features a tie belt at the waist and notch lapels. The silhouette is relaxed, designed for layering. It includes side welt pockets. Ideal for cold weather, offering warmth and modern style.',
        balanced: 'Experience modern elegance with this Calvin Klein wool blend wrap coat. Tailored for a relaxed fit, it effortlessly layers over your cold-weather ensembles. This sophisticated coat features a chic wrap front with a self-tie belt at the waist, defining a flattering silhouette. Classic notch lapels and discreet welt pockets complete the minimalist design, offering both warmth and refined style for the colder seasons.'
      }
    },
    {
      id: 'ck-002',
      title: 'Modern Cotton Bralette',
      url: 'https://www.calvinklein.us/en/women/underwear/bras/modern-cotton-bralette',
      originalDescription: 'Classic comfort bralette in soft cotton blend with signature elastic band.',
      seo: {
        strengths: {
          'Product Category': 'Clear categorization under women\'s underwear/bras helps with site architecture.',
          'Brand Recognition': 'Calvin Klein brand name provides strong SEO authority.',
          'Mobile Responsive': 'Page is fully optimized for mobile devices.'
        },
        issues: {
          'Short Meta Description': 'Current meta description is under 100 characters, missing opportunity for keywords.',
          'Missing Size Information': 'No size range mentioned in title or early description.',
          'Limited Content': 'Product description lacks detail about materials and benefits.'
        },
        recommendations: [
          'Expand meta description to 150-160 characters including keywords like "comfortable", "cotton blend", "everyday wear".',
          'Add material composition percentage to product description.',
          'Include size range (XS-XL) in product title for better search visibility.'
        ]
      },
      geo: {
        strengths: {
          'Simple Language': 'Uses clear, universally understood terms.',
          'Visual Content': 'Multiple product images from different angles aid understanding.',
          'Brand Signal': 'Strong brand recognition helps with AI retrieval.'
        },
        gaps: {
          'No Structured Data': 'Missing Product schema markup for AI parsing.',
          'Limited Context': 'No information about use cases or styling suggestions.',
          'No Reviews': 'Lacks customer reviews that could provide social proof for AI systems.'
        },
        recommendations: [
          'Add Product and Offer schema with all relevant properties.',
          'Create a "Perfect For" section describing ideal use cases.',
          'Include care instructions and material benefits for comprehensive content.'
        ]
      },
      descriptionOptions: {
        seoPrioritized: 'Shop the Calvin Klein Modern Cotton Bralette - the ultimate comfortable women\'s underwear essential. Crafted from premium cotton-modal blend (53% Cotton, 35% Modal, 12% Elastane) for all-day breathable comfort. Features the iconic Calvin Klein logo waistband and wireless design perfect for everyday wear, lounging, or light activities. Available in sizes XS-XL with removable padding. Machine washable for easy care.',
        geoPrioritized: 'Calvin Klein bralette in cotton-modal blend. Wireless design with logo elastic band. Removable padding included. Sizes XS through XL available. Machine wash cold.',
        balanced: 'Experience signature comfort with the Calvin Klein Modern Cotton Bralette. This everyday essential combines soft cotton-modal fabric with the iconic logo waistband you love. The wireless design and removable padding provide versatile comfort for any activity. Available in sizes XS-XL, machine washable for effortless care.'
      }
    }
  ];

  // Use external data if provided, otherwise fall back to sample data
  const products = externalData && externalData.length > 0 ? externalData : sampleProducts;

  const toggleProductExpansion = (productId: string) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleDescriptionSelect = (productId: string, description: string) => {
    setSelectedDescriptions(prev => ({
      ...prev,
      [productId]: description
    }));
    // Clear custom input if selecting a preset option
    if (description !== 'custom') {
      setShowCustomInput(prev => ({
        ...prev,
        [productId]: false
      }));
    }
  };

  const handleCustomDescriptionToggle = (productId: string) => {
    setShowCustomInput(prev => ({
      ...prev,
      [productId]: true
    }));
    handleDescriptionSelect(productId, 'custom');
  };

  const handleCustomDescriptionChange = (productId: string, value: string) => {
    setCustomDescriptions(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const markItemComplete = (productId: string, item: string) => {
    setCompletedItems(prev => {
      const productItems = prev[productId] || new Set();
      const newItems = new Set(productItems);
      if (newItems.has(item)) {
        newItems.delete(item);
      } else {
        newItems.add(item);
      }
      return {
        ...prev,
        [productId]: newItems
      };
    });
  };

  const toggleTodo = (productId: string, todo: string) => {
    setSelectedTodos(prev => {
      const productTodos = prev[productId] || new Set();
      const newTodos = new Set(productTodos);
      if (newTodos.has(todo)) {
        newTodos.delete(todo);
      } else {
        newTodos.add(todo);
      }
      return {
        ...prev,
        [productId]: newTodos
      };
    });
  };

  const isItemComplete = (productId: string, item: string) => {
    return completedItems[productId]?.has(item) || false;
  };

  const isTodoSelected = (productId: string, todo: string) => {
    return selectedTodos[productId]?.has(todo) || false;
  };

  const getCompletedCount = (productId: string) => {
    const completed = completedItems[productId] || new Set();
    const todos = selectedTodos[productId] || new Set();
    return completed.size + todos.size + (selectedDescriptions[productId] ? 1 : 0);
  };

  const getTotalActionableItems = () => {
    // Count: 3 SEO recs + 4 GEO recs + 1 description = 8 items per product
    return 8;
  };

  const handleSubmit = () => {
    const reportData = {
      products: products.map(product => ({
        id: product.id,
        title: product.title,
        selectedDescription: selectedDescriptions[product.id] || 'no-change',
        customDescription: customDescriptions[product.id],
        completedItems: Array.from(completedItems[product.id] || []),
        todos: Array.from(selectedTodos[product.id] || [])
      }))
    };
    console.log('Submitting report data:', reportData);
    alert('Report submitted! (Check console for data)');
  };

  return (
    <div style={{
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      color: '#000000'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '2rem 3rem',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '300',
          letterSpacing: '2px',
          margin: 0,
          textTransform: 'uppercase'
        }}>
          SEO/GEO Optimization Report
        </h1>
        <p style={{
          fontSize: '0.875rem',
          marginTop: '0.5rem',
          opacity: 0.8,
          letterSpacing: '1px'
        }}>
          CALVIN KLEIN PRODUCT CATALOG
        </p>
      </div>

      {/* Overview Section */}
      <div style={{
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #e0e0e0',
        padding: '2rem 3rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '1rem',
          fontWeight: '600',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          How to Use This Report
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2rem',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          color: '#333333'
        }}>
          <div>
            <div style={{ 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: '#000000'
            }}>
              1. Review Audit Results
            </div>
            <p style={{ margin: 0 }}>
              Examine SEO and GEO findings for each product. Strengths show what's working well, while issues and recommendations highlight areas for improvement.
            </p>
          </div>
          <div>
            <div style={{ 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: '#000000'
            }}>
              2. Create To-Dos
            </div>
            <p style={{ margin: 0 }}>
              Check the boxes next to recommendations that require technical changes (meta tags, schema markup, etc.) to add them to your to-do list.
            </p>
          </div>
          <div>
            <div style={{ 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: '#000000'
            }}>
              3. Select Descriptions
            </div>
            <p style={{ margin: 0 }}>
              Choose optimized descriptions or keep current ones. Select from SEO-focused, GEO-focused, balanced versions, or write custom descriptions.
            </p>
          </div>
        </div>
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          <strong>Note:</strong> Click on each product to expand its detailed report. Mark items as selected as you work through them. When finished, click "Submit Report" to send your selections to the next workflow stage.
        </div>
      </div>

      {/* Products Container */}
      <div style={{ padding: '0 2rem 2rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {products.map((product) => (
          <div key={product.id} style={{
            marginBottom: '2rem',
            border: '1px solid #000000',
            backgroundColor: '#ffffff'
          }}>
            {/* Product Header */}
            <div 
              style={{
                padding: '1.5rem',
                backgroundColor: '#f8f8f8',
                borderBottom: '1px solid #000000',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => toggleProductExpansion(product.id)}
            >
              <div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '400',
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  {product.title}
                </h2>
                <a href={product.url} style={{
                  fontSize: '0.875rem',
                  color: '#666666',
                  textDecoration: 'none',
                  marginTop: '0.25rem',
                  display: 'inline-block'
                }}>
                  {product.url}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginRight: '1rem'
                }}>
                  <span style={{
                    backgroundColor: getCompletedCount(product.id) > 0 ? '#000000' : '#e0e0e0',
                    color: getCompletedCount(product.id) > 0 ? '#ffffff' : '#666666',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    letterSpacing: '1px'
                  }}>
                    {getCompletedCount(product.id)}/{getTotalActionableItems()} SELECTED
                  </span>
                </div>
                {expandedProducts[product.id] ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedProducts[product.id] && (
              <div style={{ padding: '2rem' }}>
                {/* SEO Audit Section */}
                <div style={{
                  marginBottom: '2rem',
                  border: '1px solid #e0e0e0',
                  padding: '1.5rem',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      margin: 0
                    }}>
                      <Search size={18} />
                      SEO AUDIT
                    </h3>
                  </div>

                  {/* SEO Strengths */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Strengths
                    </h4>
                    <div style={{ marginLeft: '1.25rem' }}>
                      {Object.entries(product.seo.strengths).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '0.75rem' }}>
                          <strong style={{ fontSize: '0.875rem', color: '#000000' }}>{key}:</strong>
                          <span style={{ fontSize: '0.875rem', marginLeft: '0.5rem', lineHeight: '1.5', color: '#333333' }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SEO Issues */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Issues
                    </h4>
                    <div style={{ marginLeft: '1.25rem' }}>
                      {Object.entries(product.seo.issues).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '0.75rem' }}>
                          <strong style={{ fontSize: '0.875rem', color: '#000000' }}>{key}:</strong>
                          <span style={{ fontSize: '0.875rem', marginLeft: '0.5rem', lineHeight: '1.5', color: '#333333' }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SEO Recommendations with To-Do Checkboxes */}
                  <div>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Recommendations
                    </h4>
                    <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      {product.seo.recommendations.map((rec, idx) => (
                        <li key={idx} style={{
                          fontSize: '0.875rem',
                          marginBottom: '0.75rem',
                          lineHeight: '1.5',
                          color: '#333333'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={isTodoSelected(product.id, `seo-${idx}`)}
                              onChange={() => toggleTodo(product.id, `seo-${idx}`)}
                              style={{
                                marginTop: '0.25rem',
                                cursor: 'pointer'
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <span>{rec}</span>
                              {isTodoSelected(product.id, `seo-${idx}`) && (
                                <span style={{
                                  display: 'inline-block',
                                  marginLeft: '0.5rem',
                                  padding: '0.125rem 0.5rem',
                                  backgroundColor: '#000000',
                                  color: '#ffffff',
                                  fontSize: '0.75rem',
                                  borderRadius: '2px'
                                }}>
                                  Added to To-Do
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* GEO Findings Section */}
                <div style={{
                  marginBottom: '2rem',
                  border: '1px solid #e0e0e0',
                  padding: '1.5rem',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      margin: 0
                    }}>
                      <Globe size={18} />
                      GEO FINDINGS
                    </h3>
                  </div>

                  {/* GEO Strengths */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      GEO Strengths
                    </h4>
                    <div style={{ marginLeft: '1.25rem' }}>
                      {Object.entries(product.geo.strengths).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '0.75rem' }}>
                          <strong style={{ fontSize: '0.875rem', color: '#000000' }}>{key}:</strong>
                          <span style={{ fontSize: '0.875rem', marginLeft: '0.5rem', lineHeight: '1.5', color: '#333333' }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GEO Gaps/Issues */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      GEO Gaps/Issues
                    </h4>
                    <div style={{ marginLeft: '1.25rem' }}>
                      {Object.entries(product.geo.gaps).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '0.75rem' }}>
                          <strong style={{ fontSize: '0.875rem', color: '#000000' }}>{key}:</strong>
                          <span style={{ fontSize: '0.875rem', marginLeft: '0.5rem', lineHeight: '1.5', color: '#333333' }}>
                            {value}
                          </span>
                          <div style={{ 
                            fontSize: '0.8125rem', 
                            color: '#666666', 
                            marginLeft: '1rem',
                            marginTop: '0.25rem',
                            fontStyle: 'italic'
                          }}>
                            Why it matters to AI search: {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GEO Recommendations with To-Do Checkboxes */}
                  <div>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Recommendations for AI Visibility
                    </h4>
                    <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      {product.geo.recommendations.map((rec, idx) => (
                        <li key={idx} style={{
                          fontSize: '0.875rem',
                          marginBottom: '0.75rem',
                          lineHeight: '1.5',
                          color: '#333333'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={isTodoSelected(product.id, `geo-${idx}`)}
                              onChange={() => toggleTodo(product.id, `geo-${idx}`)}
                              style={{
                                marginTop: '0.25rem',
                                cursor: 'pointer'
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <span>{rec}</span>
                              {isTodoSelected(product.id, `geo-${idx}`) && (
                                <span style={{
                                  display: 'inline-block',
                                  marginLeft: '0.5rem',
                                  padding: '0.125rem 0.5rem',
                                  backgroundColor: '#000000',
                                  color: '#ffffff',
                                  fontSize: '0.75rem',
                                  borderRadius: '2px'
                                }}>
                                  Added to To-Do
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Optimized Description Options */}
                <div style={{
                  marginBottom: '2rem',
                  border: '1px solid #e0e0e0',
                  padding: '1.5rem',
                  backgroundColor: isItemComplete(product.id, 'description') ? '#f9f9f9' : '#ffffff'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      OPTIMIZED DESCRIPTION OPTIONS
                    </h3>
                    <button
                      onClick={() => markItemComplete(product.id, 'description')}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: isItemComplete(product.id, 'description') ? '#000000' : '#ffffff',
                        color: isItemComplete(product.id, 'description') ? '#ffffff' : '#000000',
                        border: '1px solid #000000',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {isItemComplete(product.id, 'description') && <Check size={14} />}
                      {isItemComplete(product.id, 'description') ? 'SELECTED' : 'MARK SELECTED'}
                    </button>
                  </div>

                  {/* Current/Original Description */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      backgroundColor: '#666666',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '0.75rem'
                    }}>
                      CURRENT DESCRIPTION
                    </div>
                    <div style={{
                      padding: '1rem',
                      border: '2px solid #000000',
                      backgroundColor: '#f9f9f9',
                      fontWeight: '500'
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: '0.9375rem',
                        lineHeight: '1.6'
                      }}>
                        {product.originalDescription}
                      </p>
                      <div style={{
                        marginTop: '0.75rem',
                        fontSize: '0.75rem',
                        color: '#666666'
                      }}>
                        {product.originalDescription.length} characters • Original
                      </div>
                    </div>
                  </div>

                  {/* No Change Option */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      padding: '1rem',
                      border: selectedDescriptions[product.id] === 'no-change' 
                        ? '2px solid #000000' 
                        : '1px solid #d0d0d0',
                      cursor: 'pointer',
                      backgroundColor: selectedDescriptions[product.id] === 'no-change'
                        ? '#f5f5f5'
                        : '#ffffff',
                      transition: 'all 0.2s ease'
                    }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <input
                          type="radio"
                          name={`description-${product.id}`}
                          checked={selectedDescriptions[product.id] === 'no-change'}
                          onChange={() => handleDescriptionSelect(product.id, 'no-change')}
                          style={{
                            accentColor: '#000000'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: '0.9375rem' }}>Keep Current Description (No Change)</strong>
                          <div style={{
                            marginTop: '0.5rem',
                            fontSize: '0.75rem',
                            color: '#666666'
                          }}>
                            Maintain the existing product description without modifications
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* SEO-Prioritized Version */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      backgroundColor: '#333333',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '0.75rem'
                    }}>
                      SEO-PRIORITIZED VERSION
                    </div>
                    <label style={{
                      display: 'block',
                      padding: '1rem',
                      border: selectedDescriptions[product.id] === product.descriptionOptions.seoPrioritized 
                        ? '2px solid #000000' 
                        : '1px solid #d0d0d0',
                      cursor: 'pointer',
                      backgroundColor: selectedDescriptions[product.id] === product.descriptionOptions.seoPrioritized
                        ? '#f5f5f5'
                        : '#ffffff',
                      transition: 'all 0.2s ease'
                    }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                          type="radio"
                          name={`description-${product.id}`}
                          checked={selectedDescriptions[product.id] === product.descriptionOptions.seoPrioritized}
                          onChange={() => handleDescriptionSelect(product.id, product.descriptionOptions.seoPrioritized)}
                          style={{
                            marginTop: '0.25rem',
                            accentColor: '#000000'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{
                            margin: 0,
                            fontSize: '0.9375rem',
                            lineHeight: '1.6'
                          }}>
                            {product.descriptionOptions.seoPrioritized}
                          </p>
                          <div style={{
                            marginTop: '0.75rem',
                            fontSize: '0.75rem',
                            color: '#666666'
                          }}>
                            {product.descriptionOptions.seoPrioritized.length} characters • Keyword optimized • SERP focused
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* GEO-Prioritized Version */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      backgroundColor: '#555555',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '0.75rem'
                    }}>
                      GEO-PRIORITIZED VERSION
                    </div>
                    <label style={{
                      display: 'block',
                      padding: '1rem',
                      border: selectedDescriptions[product.id] === product.descriptionOptions.geoPrioritized 
                        ? '2px solid #000000' 
                        : '1px solid #d0d0d0',
                      cursor: 'pointer',
                      backgroundColor: selectedDescriptions[product.id] === product.descriptionOptions.geoPrioritized
                        ? '#f5f5f5'
                        : '#ffffff',
                      transition: 'all 0.2s ease'
                    }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                          type="radio"
                          name={`description-${product.id}`}
                          checked={selectedDescriptions[product.id] === product.descriptionOptions.geoPrioritized}
                          onChange={() => handleDescriptionSelect(product.id, product.descriptionOptions.geoPrioritized)}
                          style={{
                            marginTop: '0.25rem',
                            accentColor: '#000000'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{
                            margin: 0,
                            fontSize: '0.9375rem',
                            lineHeight: '1.6'
                          }}>
                            {product.descriptionOptions.geoPrioritized}
                          </p>
                          <div style={{
                            marginTop: '0.75rem',
                            fontSize: '0.75rem',
                            color: '#666666'
                          }}>
                            {product.descriptionOptions.geoPrioritized.length} characters • AI-friendly • Structured for LLMs
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Balanced Version */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '0.75rem'
                    }}>
                      BALANCED VERSION (RECOMMENDED)
                    </div>
                    <label style={{
                      display: 'block',
                      padding: '1rem',
                      border: selectedDescriptions[product.id] === product.descriptionOptions.balanced 
                        ? '2px solid #000000' 
                        : '1px solid #d0d0d0',
                      cursor: 'pointer',
                      backgroundColor: selectedDescriptions[product.id] === product.descriptionOptions.balanced
                        ? '#f5f5f5'
                        : '#ffffff',
                      transition: 'all 0.2s ease'
                    }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                          type="radio"
                          name={`description-${product.id}`}
                          checked={selectedDescriptions[product.id] === product.descriptionOptions.balanced}
                          onChange={() => handleDescriptionSelect(product.id, product.descriptionOptions.balanced)}
                          style={{
                            marginTop: '0.25rem',
                            accentColor: '#000000'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{
                            margin: 0,
                            fontSize: '0.9375rem',
                            lineHeight: '1.6'
                          }}>
                            {product.descriptionOptions.balanced}
                          </p>
                          <div style={{
                            marginTop: '0.75rem',
                            display: 'flex',
                            gap: '1rem',
                            fontSize: '0.75rem',
                            color: '#666666'
                          }}>
                            <span>✓ SEO Optimized</span>
                            <span>✓ GEO Optimized</span>
                            <span>✓ Brand Aligned</span>
                            <span>{product.descriptionOptions.balanced.length} characters</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Custom Description Option */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      backgroundColor: '#777777',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '0.75rem'
                    }}>
                      CUSTOM DESCRIPTION
                    </div>
                    <label style={{
                      display: 'block',
                      padding: '1rem',
                      border: selectedDescriptions[product.id] === 'custom' 
                        ? '2px solid #000000' 
                        : '1px solid #d0d0d0',
                      cursor: 'pointer',
                      backgroundColor: selectedDescriptions[product.id] === 'custom'
                        ? '#f5f5f5'
                        : '#ffffff',
                      transition: 'all 0.2s ease'
                    }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                          type="radio"
                          name={`description-${product.id}`}
                          checked={selectedDescriptions[product.id] === 'custom'}
                          onChange={() => handleCustomDescriptionToggle(product.id)}
                          style={{
                            marginTop: '0.25rem',
                            accentColor: '#000000'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            marginBottom: showCustomInput[product.id] ? '0.75rem' : 0
                          }}>
                            <Edit size={16} />
                            <strong style={{ fontSize: '0.9375rem' }}>Write Custom Description</strong>
                          </div>
                          {showCustomInput[product.id] && (
                            <textarea
                              value={customDescriptions[product.id] || ''}
                              onChange={(e) => handleCustomDescriptionChange(product.id, e.target.value)}
                              placeholder="Enter your custom product description here..."
                              style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '0.75rem',
                                border: '1px solid #d0d0d0',
                                fontSize: '0.9375rem',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}
                          {!showCustomInput[product.id] && (
                            <div style={{
                              fontSize: '0.75rem',
                              color: '#666666',
                              marginTop: '0.5rem'
                            }}>
                              Click to write your own optimized description
                            </div>
                          )}
                          {showCustomInput[product.id] && customDescriptions[product.id] && (
                            <div style={{
                              marginTop: '0.5rem',
                              fontSize: '0.75rem',
                              color: '#666666'
                            }}>
                              {customDescriptions[product.id].length} characters
                            </div>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Selection Status */}
                  {selectedDescriptions[product.id] && (
                    <div style={{
                      marginTop: '1.5rem',
                      padding: '1rem',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      letterSpacing: '1px'
                    }}>
                      <Check size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      {selectedDescriptions[product.id] === 'no-change' ? 'NO CHANGE SELECTED' : 'DESCRIPTION SELECTED'}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Summary and Submit Section */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: '#000000',
          color: '#ffffff'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '300',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '1.5rem'
          }}>
            Report Summary
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '300',
                marginBottom: '0.5rem'
              }}>
                {products.length}
              </div>
              <div style={{
                fontSize: '0.875rem',
                opacity: 0.8,
                letterSpacing: '1px'
              }}>
                PRODUCTS ANALYZED
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '300',
                marginBottom: '0.5rem'
              }}>
                {Object.keys(selectedDescriptions).length}
              </div>
              <div style={{
                fontSize: '0.875rem',
                opacity: 0.8,
                letterSpacing: '1px'
              }}>
                DESCRIPTIONS SELECTED
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '300',
                marginBottom: '0.5rem'
              }}>
                {products.reduce((acc, p) => {
                  const todos = selectedTodos[p.id] || new Set();
                  return acc + todos.size;
                }, 0)}
              </div>
              <div style={{
                fontSize: '0.875rem',
                opacity: 0.8,
                letterSpacing: '1px'
              }}>
                TO-DOS CREATED
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '300',
                marginBottom: '0.5rem'
              }}>
                {products.reduce((acc, p) => acc + getCompletedCount(p.id), 0)}
              </div>
              <div style={{
                fontSize: '0.875rem',
                opacity: 0.8,
                letterSpacing: '1px'
              }}>
                ITEMS SELECTED
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleSubmit}
              style={{
                padding: '1rem 3rem',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
                fontSize: '1rem',
                letterSpacing: '2px',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              Submit Report
            </button>
            <div style={{
              marginTop: '1rem',
              fontSize: '0.75rem',
              opacity: 0.7
            }}>
              Submit all selections and to-dos to the next workflow stage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOGeoReport;