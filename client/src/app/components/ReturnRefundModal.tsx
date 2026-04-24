import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  PackageX,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface ReturnRefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderNumber: string;
    orderDate: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }>;
  };
}

export function ReturnRefundModal({
  isOpen,
  onClose,
  orderData,
}: ReturnRefundModalProps) {
  const [requestType, setRequestType] = useState<"return" | "refund">("return");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const returnReasons = [
    "Product damaged or defective",
    "Wrong item received",
    "Item not as described",
    "Better price available",
    "Changed my mind",
    "Quality not as expected",
    "Size/fit issues",
    "Other",
  ];

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, upload to server
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prev) => [...prev, ...newImages]);
      toast.success(`${files.length} image(s) uploaded`);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item");
      return;
    }
    if (!reason) {
      toast.error("Please select a reason");
      return;
    }
    if (!additionalInfo.trim()) {
      toast.error("Please provide additional details");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        `${requestType === "return" ? "Return" : "Refund"} request submitted successfully!`,
        {
          description: "We'll process your request within 2-3 business days",
          duration: 5000,
        }
      );
      onClose();
      // Reset form
      setSelectedItems([]);
      setReason("");
      setAdditionalInfo("");
      setUploadedImages([]);
    }, 1500);
  };

  const calculateRefundAmount = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = orderData.items.find((i) => i.id === itemId);
      return total + (item ? item.price * item.quantity : 0);
    }, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              {requestType === "return" ? (
                <RotateCcw className="size-6 text-orange-600 dark:text-orange-400" />
              ) : (
                <PackageX className="size-6 text-orange-600 dark:text-orange-400" />
              )}
            </div>
            <DialogTitle className="text-2xl">
              {requestType === "return" ? "Return" : "Refund"} Request
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Order Info */}
          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Order Number
                </p>
                <p className="font-bold text-foreground">
                  {orderData.orderNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Order Date
                </p>
                <p className="font-bold text-foreground">
                  {orderData.orderDate}
                </p>
              </div>
            </div>
          </div>

          {/* Request Type */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Request Type
            </Label>
            <RadioGroup
              value={requestType}
              onValueChange={(value: any) => setRequestType(value)}
            >
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`relative flex items-center space-x-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    requestType === "return"
                      ? "border-[var(--primary-color)] bg-[var(--primary-color)]/5"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setRequestType("return")}
                >
                  <RadioGroupItem value="return" id="return" />
                  <Label htmlFor="return" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="size-5 text-[var(--primary-color)]" />
                      <div>
                        <p className="font-semibold text-foreground">
                          Return
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Send items back
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div
                  className={`relative flex items-center space-x-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    requestType === "refund"
                      ? "border-[var(--primary-color)] bg-[var(--primary-color)]/5"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setRequestType("refund")}
                >
                  <RadioGroupItem value="refund" id="refund" />
                  <Label htmlFor="refund" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <PackageX className="size-5 text-[var(--primary-color)]" />
                      <div>
                        <p className="font-semibold text-foreground">
                          Refund Only
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Keep items
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Select Items */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Select Items ({selectedItems.length} selected)
            </Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {orderData.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedItems.includes(item.id)
                      ? "border-[var(--primary-color)] bg-[var(--primary-color)]/5"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => handleItemToggle(item.id)}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleItemToggle(item.id)}
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Amount */}
          {selectedItems.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-foreground">
                    Estimated Refund Amount
                  </span>
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${calculateRefundAmount().toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <Separator />

          {/* Reason */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Reason for {requestType === "return" ? "Return" : "Refund"} *
            </Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {returnReasons.map((reasonOption) => (
                  <div
                    key={reasonOption}
                    className={`flex items-center space-x-3 border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      reason === reasonOption
                        ? "border-[var(--primary-color)] bg-[var(--primary-color)]/5"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setReason(reasonOption)}
                  >
                    <RadioGroupItem value={reasonOption} id={reasonOption} />
                    <Label
                      htmlFor={reasonOption}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {reasonOption}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Additional Info */}
          <div>
            <Label htmlFor="additionalInfo" className="text-base font-semibold mb-3 block">
              Additional Details *
            </Label>
            <Textarea
              id="additionalInfo"
              placeholder="Please provide more details about your request (minimum 20 characters)"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {additionalInfo.length}/500 characters
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Upload Images (Optional)
            </Label>
            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:border-[var(--primary-color)] transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="size-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">
                    Click to upload images
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 10MB each (Max 5 images)
                  </p>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 size-6 bg-red-600 text-inverse rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Important Info */}
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900 dark:text-amber-300 space-y-1">
                <p className="font-semibold">Important Information:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Returns are processed within 2-3 business days</li>
                  <li>Refunds typically take 5-7 business days</li>
                  <li>Items must be in original condition</li>
                  <li>Free return shipping for defective items</li>
                  <li>
                    For other returns, shipping costs may apply ($4.99)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 h-12 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-[var(--primary-color)]"
            >
              {isSubmitting ? (
                <>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>Submit Request</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


