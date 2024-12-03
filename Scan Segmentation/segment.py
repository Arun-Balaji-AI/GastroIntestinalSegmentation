from torchvision import transforms
from torchvision.transforms import functional as F
import torch
import matplotlib.pyplot as plt
from PIL import Image
import warnings
warnings.filterwarnings('ignore')



class SegmentImage:
    def __init__(self):
        self.model = torch.load('./Models/unet.h5', map_location = torch.device('cpu'))
        self.transforms = transforms.Compose([
            transforms.Resize(size = (224, 224), antialias=True),
            transforms.Lambda(lambda x : (x - x.min()) / (x.max() - x.min())),
            transforms.Normalize(mean = (0.5,), std = (0.5,)),
            transforms.Lambda(lambda x : x.repeat(3,1,1))
        ])

    def overlay_mask_on_scan(self, scan, mask, alpha=0.5):
        scan = (scan - scan.min()) / (scan.max() - scan.min())
        mask = (mask - mask.min()) / (mask.max() - mask.min())

    
        blended_image = (1 - alpha) * scan + alpha * mask

        return blended_image


    def preprocess_image(self, image):
        image = F.to_tensor(image)
        image = self.transforms(image)
        image = image.unsqueeze(0)


        return image

    

    def plot_scan(self,scan, mask):
        plt.figure(figsize=(18,6))

        plt.subplot(1,3,1)
        plt.imshow(scan[0,0], cmap = 'gray');
        plt.title('Input Scan')

        plt.subplot(1,3,2)
        plt.imshow(scan[0,0], cmap = 'gray');
        plt.imshow(mask[0].permute(1,2,0), alpha = 0.4);
    
        plt.show()

    def segment_scan(self, image):
        image = self.preprocess_image(image)
        with torch.inference_mode():
            mask = self.model(image)
        mask = (torch.nn.Sigmoid()(mask) > 0.5).double()
       
        result = self.overlay_mask_on_scan(image, mask)
        result = F.to_pil_image(result[0])

        return result