import cv2
from pathlib import Path
from glob import glob
from os import path

DIR = path.dirname(path.realpath(__file__))

def image_resize(image, width = None, height = None, inter = cv2.INTER_AREA):
    # initialize the dimensions of the image to be resized and
    # grab the image size
    dim = None
    (h, w) = image.shape[:2]

    # if both the width and height are None, then return the
    # original image
    if width is None and height is None:
        return image

    # check to see if the width is None
    if width is None:
        # calculate the ratio of the height and construct the
        # dimensions
        r = height / float(h)
        dim = (int(w * r), height)

    # otherwise, the height is None
    else:
        # calculate the ratio of the width and construct the
        # dimensions
        r = width / float(w)
        dim = (width, int(h * r))

    # resize the image
    resized = cv2.resize(image, dim, interpolation = inter)

    # return the resized image
    return resized


def make_dir(src_dir_num: str):
    if not src_dir_num:
        return False
    src_dir = path.join(DIR, 'img/huge-{0}'.format(src_dir_num))
    dst_dir = path.join(DIR, 'img/{0}'.format(src_dir_num))
    # print(src_dir, dst_dir)
    i = 0
    files1 = glob(src_dir + '/*.jpg')
    files2 = glob(src_dir + '/*.png')
    files3 = glob(src_dir + '/*.jpeg')
    files = files1 + files2 + files3
    # files = files[:3]
    for f in files:
        i += 1
        basename = path.basename(f)
        no_ext = path.splitext(basename)[0]
        img = cv2.imread(f)
        res_img = image_resize(img, width=1600)
        cv2.imwrite(path.join(dst_dir, "{0}.jpg".format(no_ext)), res_img)
    print('---i:', i)


def make_1_img_variants(src_dir_num: str, src_img_num: str):
    if not src_dir_num:
        return False
    src_dir = path.join(DIR, 'img/huge-{0}'.format(src_dir_num))
    dst_dir = path.join(DIR, 'img/{0}'.format(src_dir_num))
    # print(src_dir, dst_dir)
    i = 0
    file = path.join(src_dir, '{0}.jpg'.format(src_img_num))
    if not path.exists(file):
        raise Exception('file not found, {0}'.format(file))
    img = cv2.imread(file)

    dst_name = "{0}-orig.jpg".format(src_img_num)
    cv2.imwrite(path.join(dst_dir, dst_name), img)
    i += 1

    widths = [4000, 3000, 2000, 1600, 1200]
    for w in widths:
        i += 1
        res_img = image_resize(img, width=w)
        dst_name = "{0}-{1}.jpg".format(src_img_num, w)
        cv2.imwrite(path.join(dst_dir, dst_name), res_img)
    print('---i:', i)


make_dir('16')

# make_1_img_variants('02', '1')
